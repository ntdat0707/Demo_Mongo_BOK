import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Query,
  Patch,
  ParseIntPipe,
  Get,
} from '@nestjs/common';
import { ServiceproviderService } from './serviceprovider.service';
import { CreateServiceProviderDTO } from './middleware/create-serviceprovider-dto';
import { ServiceProvider } from './serviceprovider.entity';

@Controller('sp')
export class ServiceproviderController {
  constructor(private ServiceProviderService: ServiceproviderService) {}

  @Get()
  async getServiceProviders(): Promise<ServiceProvider[]> {
    return await this.ServiceProviderService.getServiceProviders();
  }
  
  @Post()
  async createSP(
    @Body(ValidationPipe) dentalDTO: CreateServiceProviderDTO,
  ): Promise<ServiceProvider> {
    return this.ServiceProviderService.createSP(dentalDTO);
  }

  @Patch('/name')
  async updateSPName(
    @Query('provider_id', ParseIntPipe) provider_id: number,
    @Query('provider_name') provider_name: string,
  ): Promise<ServiceProvider> {
    return this.ServiceProviderService.updateSPName(provider_id, provider_name);
  }

  @Patch('/location')
  async updateSPLocation(
    @Query('provider_id', ParseIntPipe) provider_id: number,
    @Body('location') location: object,
  ): Promise<ServiceProvider> {
    return this.ServiceProviderService.updateSPLocation(provider_id, location);
  }

  @Get('/address')
  async getAddresses(@Query('city')city:string):Promise<string[]>{
    return this.ServiceProviderService.getAddresses(city);
  }
}
