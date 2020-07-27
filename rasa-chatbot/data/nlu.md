## intent:greet
- hey
- hello
- hi
- good morning
- good evening
- hey there
- that's great

## intent:goodbye
- bye
- goodbye
- see you around
- see you later

## intent: selected_location
- selected location
- select city

## intent: selected_near_location
- selected service near location
- nearest branch

## intent:ask_name
- [oanh]{"entity":"name", "value":"name"}
- my name is [oanh]{"entity":"name", "value":"name"}
- name is [oanh]{"entity":"name", "value":"name")

## intent:hello_rasa
- hello rasa
- hi rasa
- hey rasa

## intent: new_booking_info
- new booking info
- new info

## intent: select_service
- Implant
- Whitening
- checks-up
- Braces
- Fillings

## intent: selected_doctor
- selected doctor
- choice doctor

## intent: selected_date_booking
- selected date booking
- choice date booking
- 
## intent: confirmed
- confirmed 
- submited
    
## intent:ask_email
- [longvox98@gmail.com]{"entity":"email", "value": "email"}
- [example@example.com]{"entity":"email", "value": "email"}

## intent: ask_phone
- [0987654311]{"entity":"phone", "value":"phone_number"}
- [0123456781]{"entity":"phone", "value":"phone_number"}

## regex:phone_number
- ^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$

## regex:email
- [a-zA-Z0-9_.+]+@[a-zA-Z]+[.][a-zA-Z0-9-.]+$

## regex:name
- /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u

## lookup:name
data/_lookup/name.txt

