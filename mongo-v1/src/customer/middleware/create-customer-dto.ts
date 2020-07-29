import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDTO {
  @ApiProperty({type:Number})
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({type:String})
  @IsNotEmpty()
  name: string;

  @ApiProperty({type:String})
  @IsNotEmpty()
  phone: string;

  @ApiProperty({type:String})
  @IsEmail()
  email: string;
}
