import { IsNotEmpty } from 'class-validator';

export class GlobalCityDTO {
  @IsNotEmpty()
  city_id:number;

  @IsNotEmpty()
  name: string;
}
