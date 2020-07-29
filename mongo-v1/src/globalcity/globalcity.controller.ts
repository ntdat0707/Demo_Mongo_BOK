import { Controller, Get, Post, Body, ValidationPipe } from '@nestjs/common';
import { GlobalCityService } from './globalcity.service';
import { GlobalCity } from './globalcity.entity';
import { GlobalCityDTO } from './middleware/globalcity-dto';
import { ApiTags, ApiOperation, ApiOkResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';

@ApiTags('City')
@Controller('globalcity')
export class GlobalCityController {
  constructor(private globalcityService: GlobalCityService) {}

  @ApiOperation({ summary: 'Get All Cities' })
  @ApiOkResponse({ description: 'successs' })
  @Get()
  async getCities(): Promise<GlobalCity[]> {
    return this.globalcityService.getCities();
  }

  @ApiOperation({ summary: 'Create City' })
  @ApiOkResponse({ description: 'successs' })
  @ApiInternalServerErrorResponse({ description:'Interal server errors'})
  @Post()
  async createCity(@Body(ValidationPipe)cityDTO: GlobalCityDTO): Promise<GlobalCity> {
    return this.globalcityService.createCity(cityDTO);
  }
}
