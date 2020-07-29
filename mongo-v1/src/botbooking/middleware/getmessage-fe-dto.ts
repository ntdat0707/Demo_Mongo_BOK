import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MessageFEDTO {
  @ApiProperty({type:Object,description:'state,message,data'})
  @IsNotEmpty()
  message_fe: { state: string; message: string; data: any  };
}
