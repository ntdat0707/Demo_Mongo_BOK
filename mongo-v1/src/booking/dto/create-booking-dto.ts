import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateBookingDTO {
  //@ApiProperty({ type: String, description: 'title' })
  
  @IsNotEmpty()
  customer_name: string;

  //@ApiProperty({ type: String, description: 'description' })
  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  product_id: string;

  @IsNotEmpty()
  provider_id: string;

  @IsNotEmpty()
  dentist_id: string;

  @IsNotEmpty()
  price: string;

  @IsNotEmpty()
  time: string;
}
