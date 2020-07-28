import { IsNotEmpty } from 'class-validator';

export class MessageFEDTO {
  @IsNotEmpty()
  message_fe: { state: string; message: string; data: any  };
}
