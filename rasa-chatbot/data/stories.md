
## hello rasa
* HM_message_hello_rasa
  - utter_response_welcome 
  - utter_response_select_language
  - utter_state_select_language
* HM_message_still_use_english
  - utter_question_name
  - utter_state_question_name
  - slot{"name": null}
  - name_form
  - form{"name": "name_form"}
  - form{"name": null} 
> check_continue_book_another_appointment
* HM_select_location
  - utter_question_nearest_branch
  - utter_state_nearest_branch
* HM_select_nearest_branch
  - utter_question_select_cateservice
  - utter_state_select_cateservice
* HM_select_service 
  - utter_question_select_specific_services
  - utter_state_select_specific_service
* HM_select_service_specific
  - utter_question_select_doctor
  - utter_state_select_doctor
* HM_select_doctor
  - utter_response_great
  - utter_question_date_booking
  - utter_state_date_booking
* HM_select_date_booking
  - utter_response_thankyou_booking
  - utter_question_email
  - utter_state_question_email
* ASK_email
  - action_check_email
> check_ask_email
* HM_message_email_exist
  - utter_question_otp
  - utter_state_question_otp
* HM_message_OTP_true
  - utter_question_name_booking
  - slot{"name_booking": null}
  - name_booking_form
  - form{"name": "name_booking_form"}
  - form{"name": null}
* ASK_phone_number_booking
  - action_check_phone_booking
> check_my_appointment
* HM_message_confirmed
  - utter_response_bot_bye
  - utter_state_bot_bye
> check_book_another_appointment

## continue book another appointment
> check_book_another_appointment
* HM_message_book_another_appointment
  - utter_question_select_location
  - utter_state_select_location
> check_continue_book_another_appointment

# edit my appointment
> check_my_appointment
> check_edit_my_appointment
* HM_message_edit_my_appointment
  - utter_question_select_location
  - utter_state_select_location
* HM_select_location
  - utter_question_nearest_branch
  - utter_state_nearest_branch
* HM_select_nearest_branch
  - utter_question_select_cateservice
  - utter_state_select_cateservice
* HM_select_service 
  - utter_question_select_specific_services
  - utter_state_select_specific_service
* HM_select_service_specific
  - utter_question_select_doctor
  - utter_state_select_doctor
* HM_select_doctor
  - utter_response_great
  - utter_question_date_booking
  - utter_state_date_booking
* HM_select_date_booking
  - utter_response_thankyou_booking
  - utter_response_my_appointment
  - utter_state_my_appointment
> check_edit_my_appointment
* HM_message_confirmed
  - utter_response_bot_bye
  - utter_state_bot_bye

## no email in db
> check_ask_email
* HM_message_email_ready
  - utter_question_phone_number
* ASK_phone_number
  - action_check_phone
* HM_message_confirmed
  - utter_response_become_member
  - utter_state_become_member
> check_become_member
* HM_message_become_member
  - utter_response_policy
  - utter_state_policy
* HM_message_accept_policy
  - utter_response_bot_bye
  - utter_state_bot_bye

# no become member
> check_become_member
* HM_message_no_become_member
  - utter_response_bot_bye_no_booking
  - utter_state_bot_bye_no_booking
