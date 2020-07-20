import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateDentistDTO {
    @IsNotEmpty()
    name: string;
  
    @IsNotEmpty()
    provider_id: string;
  
    @IsNotEmpty()
    product_id: string;
  
    @IsOptional()
    available_time: string;
}