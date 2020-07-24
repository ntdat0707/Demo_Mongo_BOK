import { Controller, Post, Body, Get, Query, ValidationPipe } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { CreateChatbotDTO } from './middleware/create-chatbot-dto';
import { Chatbot } from './chatbot.entity';

@Controller('chatbot')
export class ChatbotController {
  constructor(private chatbotService: ChatbotService) {}


  @Get('/rasa')
  async getReply(@Body(ValidationPipe)chatbotDTO: CreateChatbotDTO):Promise<Chatbot>{
    return this.chatbotService.getReply(chatbotDTO);
  }

  @Post('/rasa')
  async sendReply(@Body(ValidationPipe) reply: object):Promise<string> {
    return this.chatbotService.sendReply(reply);
  }
}
