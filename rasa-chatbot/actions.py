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
            dispatcher.utter_template('utter_response_my_appointment', tracker)
            dispatcher.utter_template('utter_data_email', tracker)
            dispatcher.utter_template('utter_state_my_appointment', tracker)
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
        return bool(re.search(r"([+]*)[-()\s\._/0-9]*$", phone))

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        print(tracker.slots['phone'])
        if self.valid_phone(tracker.slots['phone']):
            dispatcher.utter_template('utter_response_my_appointment', tracker)
            dispatcher.utter_template('utter_data_phone', tracker)
            dispatcher.utter_template('utter_state_my_appointment', tracker)
        else:
            dispatcher.utter_template('utter_input_phone_number_again',
                                      tracker)
            dispatcher.utter_template(
                'utter_state_question_phone_number_again', tracker)
        return None


class acction_check_phone_booking(Action):
    def name(self) -> Text:
        return "action_check_phone_booking"

    @staticmethod
    def valid_phone(phone):
        return bool(re.search(r"([+]*)[-()\s\._/0-9]*$", phone))

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        if self.valid_phone(tracker.slots['phone_booking']):
            dispatcher.utter_template('utter_response_my_appointment', tracker)
            dispatcher.utter_template('utter_data_phone_booking', tracker)
            dispatcher.utter_template('utter_state_my_appointment', tracker)
        else:
            dispatcher.utter_template('utter_input_phone_number_booking_again',
                                      tracker)
            dispatcher.utter_template(
                'utter_state_question_phone_number_booking_again', tracker)
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

    # def validate_name(
    #     self,
    #     value: Text,
    #     dispatcher: CollectingDispatcher,
    #     tracker: Tracker,
    #     domain: Dict[Text, Any],
    # ) -> Dict[Text, Any]:
    #     """Validate cuisine value."""

    #     if value.lower() in self.cuisine_db():
    #         # validation succeeded, set the value of the "cuisine" slot to value
    #         return {"cuisine": value}
    #     else:
    #         dispatcher.utter_message(template="utter_wrong_cuisine")
    #         # validation failed, set this slot to None, meaning the
    #         # user will be asked for the slot again
    #         return {"cuisine": None}

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
        print(tracker.slots)
        dispatcher.utter_message('''(
            "message": [
                "Nice to meet you {name}",
                "Greate to have you with us today!!!",
                "Now, I would need your details to book your appointment."
            ]
        )'''.format(name=tracker.slots['name']))
        dispatcher.utter_message('''(
            "data": ("name": "{name}")
        )'''.format(name=tracker.slots['name']))
        dispatcher.utter_template('utter_question_select_location', tracker)
        dispatcher.utter_template('utter_state_select_location', tracker)
        return []


class NameBookingForm(FormAction):
    """Example of a custom form action"""

    def name(self) -> Text:
        """Unique identifier of the form"""

        return "name_booking_form"

    @staticmethod
    def required_slots(tracker: Tracker) -> List[Text]:
        """A list of required slots that the form has to fill"""
        return ["name_booking"]

    def slot_mappings(self) -> Dict[Text, Union[Dict, List[Dict]]]:
        """A dictionary to map required slots to
            - an extracted entity
            - intent: value pairs
            - a whole message
            or a list of them, where a first match will be picked"""
        return {
            "name_booking": [
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
        print(tracker.slots)
        dispatcher.utter_template('utter_question_phone_number_booking',
                                  tracker)
        dispatcher.utter_template('utter_state_question_phone_number_booking',
                                  tracker)
        return []
