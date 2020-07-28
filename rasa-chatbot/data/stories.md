## hello rasa
* HM_message_hello_rasa
  - UT_response_welcome
  - UT_question_follow_information
  - UT_state_follow_information
> check_hello_rasa

## greet
> check_hello_rasa
* MES_greet
  - UT_question_select_location
  - UT_state_select_location
> check_greet

## selected_location
> check_greet
* HM_select_location
  - UT_question_nearest_branch
  - UT_state_nearest_branch
> check_selected_location

## selected_near_location
> check_selected_location
* HM_select_nearest_branch
  - UT_question_select_service
  - UT_state_select_service
> check_selected_near_location

## New booking info
> check_hello_rasa
* HM_message_new_booking
  - UT_question_name
  - UT_state_question_name
> check_new_booking_info


## ask_name
> check_new_booking_info
* ASK_name
  - action_get_name
  - UT_question_phone_number
  - UT_state_question_phone_number
> check_ask_name

## ask_mail
> check_ask_phone
* ASK_email
  - action_check_email
> check_ask_email
      
## ask_phone
> check_ask_name
* ASK_phone_number
  - action_check_phone
> check_ask_phone

## selected_service
> check_ask_email
> check_selected_near_location
* HM_select_service 
  - UT_question_select_doctor
  - UT_state_select_doctor
> check_selected_service


## selected_doctor
> check_selected_service
* HM_select_doctor
  - UT_response_great
  - UT_question_date_booking
  - UT_state_date_booking
> check_selected_doctor

## selected_date_booking
> check_selected_doctor
* HM_select_date_booking
  - UT_response_thankyou_booking
  - UT_state_thankyou_booking
> check_select_date_booking

## confirmed
> check_select_date_booking
* HM_message_confirmed
  - UT_response_thankyou_confirm
  - UT_state_thankyou_confirm
> check_confirmed

## goodbye
> check_confirmed
* MES_goodbye
  - UT_response_bye_human
  - UT_state_bye_human
