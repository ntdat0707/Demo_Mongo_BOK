import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDTO {
  @ApiProperty()
  @IsNotEmpty()
  product_id: number;

  @ApiProperty()
  @IsNotEmpty()
  product_kind: string;

  @ApiProperty()
  @IsNotEmpty()
  product_price_quote: [{id:number, name: string; price: number; quantum: string }];

  // @IsNotEmpty()
  // product_price:number;
}
