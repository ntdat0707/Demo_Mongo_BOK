## hello rasa
* HM_message_hello_rasa
  - utter_response_welcome
  - utter_question_follow_information
  - utter_state_follow_information
> check_hello_rasa

## greet
> check_hello_rasa
> check_ask_email
* MES_greet
  - utter_question_select_location
  - utter_state_select_location
> check_greet

## selected_location
> check_greet
> check_select_new_more_booking
* HM_select_location
  - utter_question_nearest_branch
  - utter_state_nearest_branch
> check_selected_location

## selected_near_location
> check_selected_location
* HM_select_nearest_branch
  - utter_question_select_service
  - utter_state_select_service
> check_selected_near_location

## New booking info
> check_hello_rasa
* HM_message_new_booking
  - utter_question_name
  - utter_state_question_name
  - name_form
  - form{"name": "name"}
  - form{"name": null} 
  - utter_data_name
> check_new_booking_info

## ask_name
* ASK_name
  - action_get_name
  - utter_data_name
  - utter_question_phone_number
  - utter_state_question_phone_number
> check_ask_name

## ask_phone
> check_new_booking_info
> check_ask_name
* ASK_phone_number
  - action_check_phone
> check_ask_phone

## ask_mail
> check_ask_phone
* ASK_email
  - action_check_email
> check_ask_email      

## selected_service
> check_selected_near_location
* HM_select_service 
  - utter_question_select_specific_services
  - utter_state_select_specific_service
> check_selected_service

## select specific
> check_selected_service
* HM_select_service_specific
  - utter_question_select_doctor
  - utter_state_select_doctor
> check_selected_service_specific

## selected_doctor
> check_selected_service_specific
* HM_select_doctor
  - utter_response_great
  - utter_question_date_booking
  - utter_state_date_booking
> check_selected_doctor

## selected_date_booking
> check_selected_doctor
* HM_select_date_booking
  - utter_response_thankyou_booking
  - utter_state_thankyou_booking
> check_select_date_booking

## confirmed
> check_select_date_booking
* HM_message_confirmed
  - utter_response_thankyou_confirm
  - utter_state_thankyou_confirm
> check_confirmed

## new more booking
> check_confirmed
* HM_message_new_more_booking
  - utter_question_select_location
  - utter_state_select_location
> check_select_new_more_booking

## my appointment
> check_confirmed
* HM_message_my_appointment
  - utter_response_my_appointment
  - utter_state_my_appointment
