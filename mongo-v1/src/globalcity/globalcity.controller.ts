import { Controller, Get, Post, Body, ValidationPipe } from '@nestjs/common';
import { GlobalCityService } from './globalcity.service';
import { GlobalCity } from './globalcity.entity';
import { GlobalCityDTO } from './middleware/globalcity-dto';

@Controller('globalcity')
export class GlobalCityController {
  constructor(private globalcityService: GlobalCityService) {}

  @Get()
  async getCities(): Promise<GlobalCity[]> {
    return this.globalcityService.getCities();
  }

  @Post()
  async createCity(@Body(ValidationPipe)cityDTO: GlobalCityDTO): Promise<GlobalCity> {
    return this.globalcityService.createCity(cityDTO);
  }
}
