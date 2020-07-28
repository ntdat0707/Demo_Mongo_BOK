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
        # name = tracker.latest_message['text'].split(' ')[-1]

        return None


class action_check_email(Action):
    def name(self) -> Text:
        return "action_check_email"

    @staticmethod
    def valid_email(email):
        return bool(
            re.search(r"[a-zA-Z0-9_.+]+@[a-zA-Z]+[.][a-zA-Z0-9-.]+$", email))

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        if self.valid_email(tracker.slots['email']):
            dispatcher.utter_template('UT_question_select_service', tracker)
            dispatcher.utter_template('UT_state_select_service', tracker)
        else:
            dispatcher.utter_template('UT_input_email_again', tracker)
            dispatcher.utter_template('UT_state_question_email_again', tracker)

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
        if self.valid_phone(tracker.slots['phone']):
            dispatcher.utter_template('UT_question_email', tracker)
            dispatcher.utter_template('UT_state_question_email', tracker)
        else:
            dispatcher.utter_template('UT_input_phone_number_again', tracker)
            dispatcher.utter_template('UT_state_phone_number_again', tracker)
        return None
