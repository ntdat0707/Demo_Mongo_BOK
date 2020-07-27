import { IsNotEmpty, IsEmail } from 'class-validator';

export class GlobalCityDTO {
  @IsNotEmpty()
  city_id:number;

  @IsNotEmpty()
  name: string;
}
