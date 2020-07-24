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
    const axios = require('axios');
    axios
      .post('webhooks/restnew/webhook', {
        baseURL: 'http://192.168.1.101:5005',
        body: {
          message: 'hello',
        },
        proxy: {
          host: '192.168.1.102',
          port: 3000,
        },
        // proxy: {
        //   host: '192.168.1.101',
        //   port: 5005,
        // },
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    // axios
    //   .get('/sp', {
    //     baseURL: 'https://localhost',
    //     // body: {
    //     //   message: 'hello',
    //     // },
    //     proxy: {
    //       host: '192.168.1.102',
    //       port: 3000,
    //     },
    //   })
    //   .then(function(response) {
    //     console.log('OKE Data', response.data);
    //   });
  }
}
