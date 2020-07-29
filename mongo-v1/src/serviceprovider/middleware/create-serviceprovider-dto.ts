import { IsNotEmpty, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateDentistDTO } from 'src/dentist/middleware/create-dentist-dto';
import { CreateProductDTO } from 'src/products/middleware/create-product-dto';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';

export class CreateServiceProviderDTO {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  provider_id: number;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  provider_name: string;

  @ApiProperty({ type: Object })
  @IsOptional()
  location: { city: string; addresses: { address: string }[] };

  @ApiProperty({ type: CreateProductDTO })
  @ValidateNested()
  @Type(() => CreateProductDTO)
  products: CreateProductDTO[];

  @ApiProperty({ type: CreateDentistDTO })
  @ValidateNested()
  @Type(() => CreateDentistDTO)
  dentists: CreateDentistDTO[];
}
