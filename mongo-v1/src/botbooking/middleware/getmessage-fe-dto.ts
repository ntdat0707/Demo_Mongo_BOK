import { IsNotEmpty, IsOptional} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MessageFEDTO {
  // @ApiProperty()
  // @IsNotEmpty()
  // message_fe: {sender:string, state: string; message: string; data: any  };

  @ApiProperty()
  @IsNotEmpty()
  sender:string;

  @ApiProperty()
  @IsNotEmpty()
  state:string;

  @ApiProperty()
  @IsOptional()
  message:string;
  
  @ApiProperty()
  @IsOptional()
  data:any
}
