import { IsNotEmpty, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateDentistDTO } from 'src/dentist/middleware/create-dentist-dto';
import { CreateProductDTO } from 'src/products/middleware/create-product-dto';

export class CreateServiceProviderDTO {
  @IsNotEmpty()
  provider_id: number;

  @IsNotEmpty()
  provider_name: string;

  @IsOptional()
  location: { city: string; addresses: { address: string }[] };

  @ValidateNested()
  @Type(() => CreateProductDTO)
  products: CreateProductDTO;

  @ValidateNested()
  @Type(() => CreateDentistDTO)
  dentists: CreateDentistDTO;
}
