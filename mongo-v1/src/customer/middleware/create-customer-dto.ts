import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateCustomerDTO {
  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  phone: string;

  @IsEmail()
  email: string;
}
