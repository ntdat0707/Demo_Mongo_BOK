import { BotBooking } from "./botbooking.entity";
import { EntityRepository, Repository } from "typeorm";
import { ReplyRasaDTO } from "./middleware/sendreply-rasa-dto";
import { MessageRasaDTO } from "./middleware/getmessage-rasa-dto";
import { MessageFEDTO } from "./middleware/getmessage-fe-dto";
import { ReplyFEDTO } from "./middleware/sendreply-fe-dto.";

@EntityRepository(BotBooking)
export class BotBookingRepository extends Repository<BotBooking> {
    
    async sendReplyToRasa(replyRasa: ReplyRasaDTO): Promise<object> {
        const { reply } = replyRasa;
        let err = false;
        let dataRasa: MessageRasaDTO;
        const axios = require('axios').create({ baseURL: 'http://192.168.1.101:5005' });
        axios
            .post('webhooks/restnew/webhook', reply)
            .then(response => {
                console.log(response.data);
                dataRasa = response.data;
            })
            .catch(error => {
                err = true;
                console.log(error);
            });
        if (err == false) {
            return this.getMessageFromRasa(dataRasa);// 1
        }
    }
    // ?? send and get rasa is axios
    async getMessageFromRasa(messageRasa: MessageRasaDTO): Promise<object> {
        const { message } = messageRasa;
        let dataRasa = message;
        return dataRasa;
    }

    async sendReplyToFE(dataRasa: MessageRasaDTO) {
        const {message} = dataRasa;
        let dataFE = new MessageFEDTO();
        dataFE.message.state = message.state;
        dataFE.message.data = message.data;
        try{
            console.log(dataFE);
        }
        catch(err){
            console.log('Error Send Reply',err);/// 2
        }
     } //??

    async getMessageFromFE(messageFE: MessageFEDTO) {
        const { message } = messageFE;
        let dataFE = message;
        switch (dataFE.state) {
            case "hello": return "hello";
        }
    }
}