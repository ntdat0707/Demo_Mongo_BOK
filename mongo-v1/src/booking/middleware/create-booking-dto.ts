import { IsNotEmpty, IsEmail, ValidateNested, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateCustomerDTO } from 'src/customer/middleware/create-customer-dto';
import { CreateProductDTO } from 'src/products/middleware/create-product-dto';
export class CreateBookingDTO {
  //@ApiProperty({ type: String, description: 'title' })
  @IsNotEmpty()
  booking_id: number;

  @ValidateNested()
  @Type(() => CreateCustomerDTO)
  user: CreateCustomerDTO;

  @IsNotEmpty()
  provider_id: number;

  @IsNotEmpty()
  provider_name: string;

  @ValidateNested()
  @Type(() => CreateProductDTO)
  product: CreateProductDTO;

  @IsNotEmpty()
  dentist_id: number;

  @IsNotEmpty()
  dentist_name: string;

  @IsNotEmpty()
  @IsDateString()
  cus_booking_time: string;
}

