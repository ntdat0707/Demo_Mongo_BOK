import { Injectable, NotFoundException } from '@nestjs/common';
import { ServiceProviderRepository } from './serviceprovider.repository';
import { CreateServiceProviderDTO } from './middleware/create-serviceprovider-dto';
import { ServiceProvider } from './serviceprovider.entity';

@Injectable()
export class ServiceproviderService {
  constructor(private serviceproviderRepositorys: ServiceProviderRepository) {}

  async createSP(
    serviceproviderDTO: CreateServiceProviderDTO,
  ): Promise<ServiceProvider> {
    return this.serviceproviderRepositorys.createProvider(serviceproviderDTO);
  }

  async updateSPName(
    provider_id: number,
    provider_name: string,
  ): Promise<ServiceProvider> {
    const provider = await this.serviceproviderRepositorys.findOne({
      provider_id,
    });

    if (!provider) {
      throw new NotFoundException(
        `Not fount this id Provider`,
      );
    } else {
      provider.provider_name = provider_name;
      await provider.save();
      return provider;
    }
  }

  async updateSPLocation(
    provider_id: number,
    location: object,
  ): Promise<ServiceProvider> {
    const provider = await this.serviceproviderRepositorys.findOne({
      provider_id,
    });
    if (!provider) {
      throw new NotFoundException(
        `Not fount this id Provider`,
      );
    } else {
      provider.location = location;
      await provider.save();
      return provider;
    }
  }

  async getServiceProviders():Promise<ServiceProvider[]>{
    return this.serviceproviderRepositorys.find();
  }

  async getCity(){
    return this.serviceproviderRepositorys.getCity();
  }

  async getAddresses(city:string):Promise<string[]>{
    return this.serviceproviderRepositorys.getAddresses(city);
  }
}
