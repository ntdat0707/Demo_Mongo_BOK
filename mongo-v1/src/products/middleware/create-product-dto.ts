import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDTO {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  product_id: number;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  product_kind: string;

  @ApiProperty({ type: Array,description:'name,string,quantum' })
  @IsNotEmpty()
  product_price_quote: [{ name: string; price: number; quantum: string }];

  // @IsNotEmpty()
  // product_price:number;
}
