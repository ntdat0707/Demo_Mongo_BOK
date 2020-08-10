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

## intent:ASK_phone_number
- [0349305375](phone)
- [0987654311](phone)
- [0123456781](phone)

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

## intent:HM_message_new_booking
- new booking info
- new info

## intent:HM_message_new_more_booking
- add more booking
- add more info

## intent:HM_message_my_appointment
- my appointment
- appointment

## intent:HM_message_confirmed
- confirmed 
- submited

## intent:HM_select_location
- selected location
- select city

## intent:HM_select_nearest_branch
- selected service near location
- nearest branch

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

## intent:HM_select_date_booking
- select date booking
- choice date booking

## regex:phone
- ^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$

## regex:email
- [a-zA-Z0-9_.+]+@[a-zA-Z]+[.][a-zA-Z0-9-.]+$

## lookup:name
data/_lookup/name.txt

