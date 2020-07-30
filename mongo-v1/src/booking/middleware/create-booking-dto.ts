import { IsNotEmpty, IsEmail, ValidateNested, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateCustomerDTO } from 'src/customer/middleware/create-customer-dto';
import { CreateProductDTO } from 'src/products/middleware/create-product-dto';
export class CreateBookingDTO {
  
  @ApiProperty({type:Number})
  @IsOptional()
  booking_id: number;

  @ApiProperty({type:()=>CreateCustomerDTO})
  @ValidateNested()
  @Type(() => CreateCustomerDTO)
  user: CreateCustomerDTO;

  @ApiProperty({type:Number})
  @IsNotEmpty()
  provider_id: number;

  @ApiProperty({type:String})
  @IsNotEmpty()
  provider_name: string;

  @ApiProperty({type:()=>CreateProductDTO})
  @ValidateNested()
  @Type(() => CreateProductDTO)
  products: CreateProductDTO;

  @ApiProperty({type:Number})
  @IsNotEmpty()
  dentist_id: number;

  @ApiProperty({type:String})
  @IsNotEmpty()
  dentist_name: string;

  @ApiProperty({type:String})
  @IsNotEmpty()
  @IsDateString()
  cus_booking_time: string;
}

