import { IsNotEmpty } from 'class-validator';

export class MessageRasaDTO {
  @IsNotEmpty()
  message_rasa: { message: string[]; state: string; data: object };
}
