import {
  Controller,
  Post,
} from '@nestjs/common';

@Controller('chatbot')
export class ChatbotController {
  constructor() {}

  //Demo connect - get request --- response
  @Post()
  async getReply() {
    const axios = require('axios').create({baseURL:'http://192.168.1.101:5005'});
    axios
      .post('webhooks/restnew/webhook', {
          message: 'bye'
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });

  }
}
