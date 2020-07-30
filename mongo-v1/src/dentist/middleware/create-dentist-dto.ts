import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateDentistDTO {
    @ApiProperty()
    @IsNotEmpty()
    dentist_id:number;

    @ApiProperty()
    @IsNotEmpty()
    dentist_name: string;
  
    @ApiProperty()
    @IsNotEmpty()
    dentist_email: string;
  
    @ApiProperty()
    @IsNotEmpty()
    dentist_phone: string;
}