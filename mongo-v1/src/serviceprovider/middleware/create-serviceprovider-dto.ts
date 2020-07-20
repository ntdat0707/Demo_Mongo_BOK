import { IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateProductDTO } from 'src/products/dto/create-product-dto';
import { Type } from 'class-transformer';
import { CreateDentistDTO } from 'src/dentist/dto/create-dentist-dto';

export class CreateServiceProviderDTO {
  @IsNotEmpty()
  provider_id: number;

  @IsNotEmpty()
  provider_name: string;

  @IsNotEmpty()
  location: string;

  @ValidateNested()
  @Type(() => CreateProductDTO)
  products: CreateProductDTO;

  @ValidateNested()
  @Type(() => CreateDentistDTO)
  dentists: CreateDentistDTO;
}
