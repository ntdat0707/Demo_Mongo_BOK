## hello rasa
* hello_rasa
  - utter_wellcome
> check_hello_rasa

## greet
> check_hello_rasa
* greet
  - utter_select_location
> check_greet

## selected_location
> check_greet
* selected_location
  - utter_selected_location
> check_selected_location

## selected_near_location
> check_selected_location
* selected_near_location
  - utter_select_service
> check_selected_near_location

## New booking info
> check_hello_rasa
* new_booking_info
  - utter_question_name
> check_new_booking_info

## ask_name
> check_new_booking_info
* ask_name{"name": "a name"}
  - action_get_name
> check_ask_name

## ask_mail
> check_ask_phone
* ask_email
  - action_check_email
> check_ask_email
      
## ask_phone
> check_ask_name
* ask_phone
  - action_check_phone
> check_ask_phone

## selected_service
> check_ask_email
> check_selected_near_location
* select_service 
  - utter_select_doctor
> check_selected_service

## selected_doctor
> check_selected_service
* selected_doctor
  - utter_great
  - utter_question_choice_date
> check_selected_doctor

## selected_date_booking
> check_selected_doctor
* selected_date_booking
  - utter_thank_you_booking
> check_select_date_booking

## confirmed
> check_select_date_booking
* confirmed
  - utter_thank_you_confirm
> check_confirmed

* goodbye
> check_comfirmed
  - utter_bye_human
