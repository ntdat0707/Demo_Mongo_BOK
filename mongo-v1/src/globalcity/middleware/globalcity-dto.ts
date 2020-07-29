import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GlobalCityDTO {
  @ApiProperty()
  @IsNotEmpty()
  city_id:number;

  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
