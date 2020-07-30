import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Query,
  Patch,
  ParseIntPipe,
  Get,
} from '@nestjs/common';
import { ServiceproviderService } from './serviceprovider.service';
import { CreateServiceProviderDTO } from './middleware/create-serviceprovider-dto';
import { ServiceProvider } from './serviceprovider.entity';
import { ApiTags, ApiOperation, ApiOkResponse, ApiInternalServerErrorResponse, ApiBadRequestResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Service Provider')
@Controller('serviceprovider')
export class ServiceproviderController {
  constructor(private ServiceProviderService: ServiceproviderService) {}

  @ApiOperation({ summary: 'Get All Service Providers' })
  @ApiOkResponse({ description: 'success' })
  @Get()
  async getServiceProviders(): Promise<ServiceProvider[]> {
    return await this.ServiceProviderService.getServiceProviders();
  }

  @ApiOperation({ summary: 'Create New Service Provider' })
  @ApiOkResponse({ description: 'success' })
  @ApiBadRequestResponse({ description:"Input invalid format"})
  @ApiInternalServerErrorResponse({ description:'Interal server errors'})
  @ApiBody({type:CreateServiceProviderDTO})
  @Post()
  async createSP(
    @Body(ValidationPipe) dentalDTO: CreateServiceProviderDTO,
  ): Promise<ServiceProvider> {
    return this.ServiceProviderService.createSP(dentalDTO);
  }

  @ApiOperation({ summary: 'Update Service Provider' })
  @ApiOkResponse({ description: 'success' })
  @ApiBadRequestResponse({ description:"Input invalid format"})
  @ApiInternalServerErrorResponse({ description:'Interal server errors'})
  @Patch('/name')
  async updateSPName(
    @Query('provider_id', ParseIntPipe) provider_id: number,
    @Query('provider_name') provider_name: string,
  ): Promise<ServiceProvider> {
    return this.ServiceProviderService.updateSPName(provider_id, provider_name);
  }

  @ApiOperation({ summary: 'Update Location' })
  @ApiOkResponse({ description: 'Success' })
  @ApiBadRequestResponse({ description:"Input invalid format"})
  @ApiInternalServerErrorResponse({ description:'Interal server errors'})
  @Patch('/location')
  async updateSPLocation(
    @Query('provider_id', ParseIntPipe) provider_id: number,
    @Body('location') location: object,
  ): Promise<ServiceProvider> {
    return this.ServiceProviderService.updateSPLocation(provider_id, location);
  }

  @ApiOperation({ summary: 'Get Addresses by city' })
  @ApiOkResponse({ description: 'success' })
  @ApiBadRequestResponse({ description:"Input invalid format"})
  @ApiInternalServerErrorResponse({ description:'Interal server errors'})
  @Get('/address')
  async getAddresses(@Query('city') city: string): Promise<string[]> {
    return this.ServiceProviderService.getAddresses(city);
  }
}
