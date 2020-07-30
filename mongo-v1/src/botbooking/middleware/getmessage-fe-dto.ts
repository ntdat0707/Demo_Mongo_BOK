import { IsNotEmpty, IsOptional} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MessageFEDTO {
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
