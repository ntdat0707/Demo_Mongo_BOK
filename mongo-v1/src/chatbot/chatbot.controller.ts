
import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { CreateChatbotDTO } from './middleware/create-chatbot-dto';
import { Chatbot } from './chatbot.entity';
import { response } from 'express';

@Controller('chatbot')
export class ChatbotController {
  constructor(private chatbotService: ChatbotService) {}


  // @Get('/rasa')
  // async getReply(@Body(ValidationPipe)chatbotDTO: CreateChatbotDTO):Promise<Chatbot>{
  //   return this.chatbotService.getReply(chatbotDTO);
  // }

  // @Post('/rasa')
  // async getReply(@Body(ValidationPipe) chatbotDTO: CreateChatbotDTO):Promise<Chatbot> {
  //   console.log("Reply",JSON.stringify(chatbotDTO));
  //   return this.chatbotService.getReply(chatbotDTO);
  // }

  @Post()
  async getReply() {
    const axios = require('axios').create({baseURL: 'http://localhost:5005'});
    axios
      .post('webhooks/restnew/webhook', {
          message: 'hello rasa'
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });

  }
}
