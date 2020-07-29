import logging
import uuid
import inspect
import rasa
import json
from sanic import Blueprint, response
from sanic.request import Request
from socketio import AsyncServer
from typing import Text, List, Dict, Any, Optional, Callable, Iterable, Awaitable
from asyncio import Queue, CancelledError
from rasa.core.channels.channel import UserMessage, OutputChannel, CollectingOutputChannel, InputChannel
from functools import reduce

logger = logging.getLogger(__name__)

INIT_VALUE_MESSAGE = {'message': [], 'state': None, 'data': {}}


def is_json(myjson):
    try:
        json_object = json.loads(myjson)
    except ValueError as e:
        return False
    return True


def format_message(item):
    object_default = {"message": None, "state": None, "data": {}}

    item['text'] = item['text'].replace('(', '{')
    item['text'] = item['text'].replace(')', '}')
    print(item['text'])

    if is_json(item['text']):
        data = json.loads(item['text'])
    else:
        data = {}

    object_default.update(data)
    return object_default


def merge_message(current_value, item):
    if isinstance(item['message'], list):
        print(item['message'])
        current_value['message'] = current_value['message'] + item['message']
    else:
        current_value['message'].append(item['message'])

    current_value['state'] = current_value['state'] == None \
        and item['state'] or current_value['state']
    current_value['data'].update(item['data'])

    return current_value


class MyRestInput(InputChannel):
    """A custom http input channel.
    This implementation is the basis for a custom implementation of a chat
    frontend. You can customize this to send messages to Rasa Core and
    retrieve responses from the agent."""
    @classmethod
    def name(cls) -> Text:
        return "restnew"

    @staticmethod
    async def on_message_wrapper(
        on_new_message: Callable[[UserMessage], Awaitable[Any]],
        text: Text,
        queue: Queue,
        sender_id: Text,
        input_channel: Text,
        metadata: Optional[Dict[Text, Any]],
    ) -> None:
        collector = QueueOutputChannel(queue)

        message = UserMessage(text,
                              collector,
                              sender_id,
                              input_channel=input_channel,
                              metadata=metadata)
        await on_new_message(message)

        await queue.put("DONE")  # pytype: disable=bad-return-type

    async def _extract_sender(self, req: Request) -> Optional[Text]:
        return req.json.get("sender", None)

    # noinspection PyMethodMayBeStatic
    def _extract_message(self, req: Request) -> Optional[Text]:
        return req.json.get("message", None)

    def get_metadata(self, req: Request):
        return req.json.get("customData", None)

    def _extract_input_channel(self, req: Request) -> Text:
        return req.json.get("input_channel") or self.name()

    def stream_response(
        self,
        on_new_message: Callable[[UserMessage], Awaitable[None]],
        text: Text,
        sender_id: Text,
        input_channel: Text,
        metadata: Optional[Dict[Text, Any]],
    ) -> Callable[[Any], Awaitable[None]]:
        async def stream(resp: Any) -> None:
            q = Queue()
            task = asyncio.ensure_future(
                self.on_message_wrapper(on_new_message, text, q, sender_id,
                                        input_channel, metadata))
            result = None  # declare variable up front to avoid pytype error
            while True:
                result = await q.get()
                if result == "DONE":
                    break
                else:
                    await resp.write(json.dumps(result) + "\n")
            await task

        return stream  # pytype: disable=bad-return-type

    def blueprint(
            self, on_new_message: Callable[[UserMessage],
                                           Awaitable[None]]) -> Blueprint:
        custom_webhook = Blueprint(
            "custom_webhook_{}".format(type(self).__name__),
            inspect.getmodule(self).__name__,
        )

        # noinspection PyUnusedLocal
        @custom_webhook.route("/", methods=["GET"])
        async def health(request: Request):
            return response.json({"status": "ok"})

        @custom_webhook.route("/webhook", methods=["POST"])
        async def receive(request: Request):

            sender_id = await self._extract_sender(request)
            text = self._extract_message(request)
            should_use_stream = rasa.utils.endpoints.bool_arg(request,
                                                              "stream",
                                                              default=False)
            input_channel = self._extract_input_channel(request)
            metadata = self.get_metadata(request)

            if should_use_stream:
                return response.stream(
                    self.stream_response(on_new_message, text, sender_id,
                                         input_channel, metadata),
                    content_type="text/event-stream",
                )
            else:
                collector = CollectingOutputChannel()
                # noinspection PyBroadException
                try:
                    await on_new_message(
                        UserMessage(
                            text,
                            collector,
                            sender_id,
                            input_channel=input_channel,
                            metadata=metadata,
                        ))
                except CancelledError:
                    logger.error("Message handling timed out for "
                                 "user message '{}'.".format(text))
                except Exception:
                    logger.exception("An exception occured while handling "
                                     "user message '{}'.".format(text))

                collector_messages = list(
                    map(format_message, collector.messages))
                collector_messages = reduce(merge_message, collector_messages,
                                            {
                                                'message': [],
                                                'state': None,
                                                'data': {}
                                            })

                return response.json(collector_messages)

        return custom_webhook
