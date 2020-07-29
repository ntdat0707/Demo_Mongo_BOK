import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MessageFEDTO {
  @ApiProperty()
  @IsNotEmpty()
  message_fe: {sender:string, state: string; message: string; data: any  };
}
