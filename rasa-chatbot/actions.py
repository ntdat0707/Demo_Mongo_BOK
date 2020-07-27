from typing import Any, Text, Dict, List

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet
from rasa_sdk.forms import FormAction, REQUESTED_SLOT
import asyncio
import re
import uuid


def get_dict_certain_keys(dic, keys):
    return dict(zip(keys, [dic[key] for key in keys]))


class action_get_name(Action):
    def name(self) -> Text:
        return "action_get_name"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        print(tracker.slots)
        print(tracker.latest_message['text'])
        name = tracker.latest_message['text'].split(' ')[-1]

        return [SlotSet("name", name)]


class action_check_email(Action):
    def name(self) -> Text:
        return "action_check_email"

    @staticmethod
    def valid_email(email):
        return bool(
            re.search(r"[a-zA-Z0-9_.+]+@[a-zA-Z]+[.][a-zA-Z0-9-.]+$", email))

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        if self.valid(tracker.slost['email']):
            dispatcher.utter_template('utter_select_service')
        else:
            dispatcher.utter_template('utter_input_email_again')
        return None


class acction_check_phone(Action):
    def name(self) -> Text:
        return "action_check_phone"

    @staticmethod
    def valid_phone(phone):
        return bool(
            re.search(
                r"^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$",
                phone))

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        if self.valid(tracker.slots['phone']):
            dispatcher.utter_template('utter_questions_email')
        else:
            dispatcher.utter_template('utter_input_phone_again')
        return None
