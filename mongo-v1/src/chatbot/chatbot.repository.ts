import { Chatbot } from './chatbot.entity';
import { Repository, EntityRepository } from 'typeorm';
import { CreateChatbotDTO } from './middleware/create-chatbot-dto';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Chatbot)
export class ChatbotRepository extends Repository<Chatbot> {
  async getMessage(messageDTO: CreateChatbotDTO) {
    const { channel_id, message } = messageDTO;
    const chatbot = new Chatbot();
    chatbot.channel_id = channel_id;
    chatbot.message = message;

    try {
     // await chatbot.save();
     console.log('Chatbot', chatbot);
      return chatbot;
    } catch (error) {
      console.log(`Error: ${error.message}, error code: ${error.code}`);
      throw new InternalServerErrorException();
    }
  }

  // async createMessage(createChatbot:CreateChatbotDTO):Promise<Chatbot> {
  //     const {channel_id,message,type} = createChatbot;
  //     const chatbot = new Chatbot();
  //     chatbot.channel_id = channel_id;
  //     chatbot.message = message;
  //     chatbot.type = type;
  //     try {
  //         await chatbot.save();
  //         return chatbot;
  //     }catch(error){
  //         console.log(`Error: ${error.message}, error code: ${error.code}`);
  //         throw new InternalServerErrorException()
  //     }
  // }
}
