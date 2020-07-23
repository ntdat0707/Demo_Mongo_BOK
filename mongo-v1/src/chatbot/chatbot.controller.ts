import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { CreateChatbotDTO } from './middleware/create-chatbot-dto';

@Controller('chatbot')
export class ChatbotController {
  constructor(private chatbotService: ChatbotService) {}

  @Post()
  async createMessage(@Body() createChatbotDTO: CreateChatbotDTO) {
    return this.chatbotService.createMessage(createChatbotDTO);
  }

  // @Get()
  // async getMessageByLanguage(
  //   @Query('type') type: string,
  //   @Query('provider_name') provider_name: string,
  // ): Promise<string>{
  //   return this.chatbotService.getMessageByLanguage(type, provider_name);
  // }
}
