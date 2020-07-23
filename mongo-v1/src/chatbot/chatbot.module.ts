import { Module } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ChatbotController } from './chatbot.controller';
import { ChatbotRepository } from './chatbot.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([ChatbotRepository])],
  providers: [ChatbotService],
  controllers: [ChatbotController]
})
export class ChatbotModule {}
