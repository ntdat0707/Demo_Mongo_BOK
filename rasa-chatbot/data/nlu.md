## intent:greet
- hey
- hello
- hi
- good morning
- good evening
- hey there
- that's greate
    
## intent:goodbye
- bye
- goodbye
- see you around
- see you later

## intent:ask_name
- [oanh](name)
- [huyen nguyen](name)
- my name is [oanh](name)
- name is [oanh](name)

## intent:ask_email
- [longvox98@gmail.com](email)
- [example@example.com](email)

## intent: ask_phone
- [0987654311](phone)
- [0123456781](phone)

## regex:phone_number
- ^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$

## regex:email
- [a-zA-Z0-9_.+]+@[a-zA-Z]+[.][a-zA-Z0-9-.]+$

## regex:name
- /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u

## lookup:name
data/_lookup/name.txt

