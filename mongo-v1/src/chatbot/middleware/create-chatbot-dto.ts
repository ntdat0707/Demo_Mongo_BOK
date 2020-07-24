import { IsNotEmpty, IsOptional, IsIn } from 'class-validator';
import { Language } from '../chatbot.entity';

export class CreateChatbotDTO {
  @IsNotEmpty()
  channel_id: string;

  @IsNotEmpty()
  message: { message: string[]; state: string; data: object };

  @IsOptional()
  type: Language;
}
