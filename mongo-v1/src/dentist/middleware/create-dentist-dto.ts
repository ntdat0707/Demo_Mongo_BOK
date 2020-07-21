import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateDentistDTO {
    @IsNotEmpty()
    dentist_id:number;

    @IsNotEmpty()
    dentist_name: string;
  
    @IsNotEmpty()
    dentist_email: string;
  
    @IsNotEmpty()
    dentist_phone: string;
}