import { IsNotEmpty } from 'class-validator';

export class MessageFEDTO {
  @IsNotEmpty()
  message_fe: { state: string; data: { message: string; data: any } };
}
