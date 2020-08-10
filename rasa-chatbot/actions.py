from typing import Any, Text, Dict, List, Union
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
            dispatcher.utter_template('utter_question_select_location',
                                      tracker)
            dispatcher.utter_template('utter_data_email', tracker)
            dispatcher.utter_template('utter_state_select_location', tracker)
        else:
            dispatcher.utter_template('utter_input_email_again', tracker)
            dispatcher.utter_template('utter_state_question_email_again',
                                      tracker)

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
        print(tracker.slots['phone'])
        if self.valid_phone(tracker.slots['phone']):
            dispatcher.utter_template('utter_question_email', tracker)
            dispatcher.utter_template('utter_data_phone', tracker)
            dispatcher.utter_template('utter_state_question_email', tracker)
        else:
            dispatcher.utter_template('utter_input_phone_number_again',
                                      tracker)
            dispatcher.utter_template('utter_state_phone_number_again',
                                      tracker)
        return None


class NameForm(FormAction):
    """Example of a custom form action"""
    def name(self) -> Text:
        """Unique identifier of the form"""

        return "name_form"

    @staticmethod
    def required_slots(tracker: Tracker) -> List[Text]:
        """A list of required slots that the form has to fill"""
        return ["name"]

    def slot_mappings(self) -> Dict[Text, Union[Dict, List[Dict]]]:
        """A dictionary to map required slots to
            - an extracted entity
            - intent: value pairs
            - a whole message
            or a list of them, where a first match will be picked"""
        return {
            "name": [
                self.from_text(),
            ],
        }

    def submit(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict]:
        """Define what the form has to do
            after all required slots are filled"""

        # utter submit template
        # dispatcher.utter_template("utter_urlAvailable", tracker)
        # print(tracker.slots)
        dispatcher.utter_template("utter_data_name", tracker)
        dispatcher.utter_template("utter_question_phone_number", tracker)
        dispatcher.utter_template("utter_state_question_phone_number", tracker)
        return []
