import { IsNotEmpty, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateDentistDTO } from 'src/dentist/middleware/create-dentist-dto';
import { CreateProductDTO } from 'src/products/middleware/create-product-dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceProviderDTO {
  @ApiProperty()
  @IsNotEmpty()
  provider_id: number;

  @ApiProperty()
  @IsNotEmpty()
  provider_name: string;

  @ApiProperty({type:Object})
  @IsOptional()
  //location: { city: string; addresses: { address: string }[] };
  location: object;
  
  @ApiProperty({ type:()=> CreateProductDTO })
  @ValidateNested()
  @Type(() => CreateProductDTO)
  products: CreateProductDTO[];

  @ApiProperty({ type:()=> CreateDentistDTO })
  @ValidateNested()
  @Type(() => CreateDentistDTO)
  dentists: CreateDentistDTO[];
}
