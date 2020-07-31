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
      throw new NotFoundException(`Not found this id Provider`);
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
      throw new NotFoundException(`Not fount this id Provider`);
    } else {
      provider.location = location;
      await provider.save();
      return provider;
    }
  }

  async getServiceProviders(): Promise<ServiceProvider[]> {
    return this.serviceproviderRepositorys.find();
  }

  async getAddresses(city: string): Promise<string[]> {
    return this.serviceproviderRepositorys.getAddresses(city);
  }

  async getProducts(provider_id: number, kind: string): Promise<object> {
    const provider = await this.serviceproviderRepositorys.findOne({
      provider_id: provider_id,
    });
    if (!provider) {
      throw new NotFoundException(`Not found Provider by id:${provider_id}`);
    }
    for (const product of provider.products) {
      if (product['product_kind'] == kind) {
        console.log("Product:",product);
        return product;
      }
    }
  }

  async getDentists(provider_id: number):Promise<object[]> {
    const provider = await this.serviceproviderRepositorys.findOne({
      provider_id: provider_id,
    });

    if (!provider) {
      throw new NotFoundException(`Not found Provider by id:${provider_id}`);
    }
    else{
      return provider.dentists;
    }
  }

}
