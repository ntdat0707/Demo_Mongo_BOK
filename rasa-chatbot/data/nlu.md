## intent:MES_greet
- hey
- hello
- hi
- good morning
- good evening
- hey there
- that's great

## intent:MES_goodbye
- bye
- goodbye
- see you around
- see you later

## intent:ASK_name
- [oanh](name)
- [huyen nguyen](name)
- [huy](name)
- [dat nguyen](name)
- my name is [oanh](name)
- my name is [hoang long](name)
- name is [oanh](name)

## intent:ASK_email
- [human@gmail.com](email)
- [example@example.com](email)
- [human@yahoo](email)
- [human@outlook](email)
- [human@gmail](email)
- [human@live](email)
- [example@example](email) 
- [example@unibiz](email)
- [example@cinnolab](email)
- [asdasd@ahbcvsdr.234dsfd](email)
- [osdfusd788@hjsfdfuo.dusifo](email)
- [cvbbnm123vcuyi@dshff.aisdo](email)
    
## intent:ASK_phone_number
- [0349305375](phone)
- [0987654311](phone)
- [0123456781](phone)
- [+(123) - 456-78-90](phone)
- [754-3010](phone)
- [(541) 754-3010](phone)
- [+1-541-754-3010](phone)
- [1-541-754-3010](phone)
- [001-541-754-3010](phone)
- [1-541-754-3010](phone)
- [636-48018](phone)
- [(089) / 636-48018](phone)

## intent:HM_select_service_specific
- Implant korea - Dentium
- Mini implant
- Implant Staumann SLA
- Ziconia
- Implant France SLA
- select_service_specific
 
## intent:HM_message_hello_rasa
- hello rasa
- hi rasa
- hey rasa
- chatbot wellcome
- hello_rasa

## intent:HM_message_new_booking
- new booking info
- new info
- new_booking

## intent:HM_message_new_more_booking
- add more booking
- add more info
- new_more_booking
- 
## intent:HM_message_my_appointment
- my appointment
- appointment
- my_appointment

## intent:HM_message_confirmed
- confirmed 
- submited

## intent:HM_message_first_visit
- first visit
- first_visit
- firstvisit

## intent:HM_message_follow_up_visit
- follow_up_visit
- followupvisit
- follow-up-visit

## intent:HM_message_still_use_english
- still_use_english
- use english
- choice english
- select english

## intent:HM_message_no_use_login_information
- no_use_login_information
- no_use_info_login
- no use login information

## intent:HM_message_continue_use_login_information
- continue_use_login_information
- continue use information
- continueuseinformation

## intent:HM_message_book_another_appointment
- yes book another appointment
- continue book another appointment
- book_another_appointment

## intent:HM_message_no_book_another_appointment
- no book another appointment
- no_booking_another_appointment

## intent:HM_select_location
- selected location
- select city
- select_location
 
## intent:HM_select_nearest_branch
- selected service near location
- nearest branch
- select_nearest_branch

## intent:HM_select_service
- Implant
- Whitening
- checks-up
- Braces
- Fillings
- select_service

## intent:HM_select_doctor
- select doctor
- choice doctor
- select_doctor

## intent:HM_select_date_booking
- select date booking
- choice date booking
- select_date_booking

## regex:phone
- ([+]*)[-()\s\._/0-9]*$

## regex:email
- [a-zA-Z0-9-.@]+$

## lookup:name
data/_lookup/name.txt
