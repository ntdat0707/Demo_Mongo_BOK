import { CreateChatbotDTO } from './middleware/create-chatbot-dto';
import { Injectable } from '@nestjs/common';
import { Chatbot } from './chatbot.entity';
import { ChatbotRepository } from './chatbot.repository';

@Injectable()
export class ChatbotService {
  constructor(private chatbotRepository: ChatbotRepository) {}
  async getMessage() {}
  async getReply() {}
  async sendReply() {}

  async createMessage(createChatbotDTO: CreateChatbotDTO): Promise<Chatbot> {
    return this.chatbotRepository.createMessage(createChatbotDTO);
  }

  // async getMessageByLanguage(
  //   type: string,
  //   provider_name: string,
  // ): Promise<string> {
  //   const messages = await this.chatbotRepository.find();
  //   const messages_vn: Chatbot[] = [];
  //   const messages_en: Chatbot[] = [];
  //   for (let mess of messages) {
  //     if (mess.type == 'EN') {
  //       messages_en.push(mess);
  //     } else {
  //       messages_vn.push(mess);
  //     }
  //   }

  //   let messagetoRasa = '';
  //   if (messages_vn.length > 0) {
  //   messagetoRasa = this.getMessageToRasa(messages_vn,provider_name);
  //   } else {
  //     messagetoRasa = this.getMessageToRasa(messages_en,provider_name);
  //   }
  //   return messagetoRasa;
  // }

  // getMessageToRasa(messages: Chatbot[], provider_name: string):string {
  //   let messagetoRasa = '';
  //   let i = 0;
  //   for (i; i < messages.length; i++) {
  //     messagetoRasa =
  //       i == 0
  //         ? 'HELLO' +"/"+ messages[i].message + provider_name
  //         : messagetoRasa+"/" + messages[i].message;
  //   }
  //   return messagetoRasa;
  // }
}
