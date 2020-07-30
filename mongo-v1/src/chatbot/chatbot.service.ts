import { CreateChatbotDTO } from './middleware/create-chatbot-dto';
import { Injectable } from '@nestjs/common';
import { Chatbot } from './chatbot.entity';
import { ChatbotRepository } from './chatbot.repository';

@Injectable()
export class ChatbotService {
  constructor(private chatbotRepository: ChatbotRepository) {}


  async getMessage(chatbotDTO: CreateChatbotDTO):Promise<Chatbot> {
    return this.chatbotRepository.getMessage(chatbotDTO);
  }

  
  async getReply(chatbotDTO: CreateChatbotDTO):Promise<Chatbot> {
    return this.chatbotRepository.getMessage(chatbotDTO);
  }

  async sendReply(reply:object):Promise<string> {
    let reply_Rasa = await reply;
    console.log("Reply:",JSON.stringify(reply_Rasa));
    return `This is your message ${reply_Rasa}`;
  }

  // async createMessage(createChatbotDTO: CreateChatbotDTO): Promise<Chatbot> {
  //   return this.chatbotRepository.createMessage(createChatbotDTO);
  // }
}
