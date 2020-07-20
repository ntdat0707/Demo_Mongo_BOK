import { ServiceProvider } from './serviceprovider.entity';
import { Repository, EntityRepository } from 'typeorm';
import { CreateServiceProviderDTO } from './middleware/create-serviceprovider-dto';
import { Product } from 'src/products/product.entity';
import { CreateDentistDTO } from 'src/dentist/dto/create-dentist-dto';

import { CreateProductDTO } from 'src/products/dto/create-product-dto';
@EntityRepository(ServiceProvider)
export class ServiceProviderRepository extends Repository<ServiceProvider> {
  //Function test for entity
  async createProvider(
    createProviderDTO: CreateServiceProviderDTO,
  ): Promise<ServiceProvider> {
    let {
      provider_id,
      provider_name,
      location,
      products = CreateProductDTO,
      dentists = CreateDentistDTO,
    } = createProviderDTO;

    const provider = new ServiceProvider();
    provider.provider_id = provider_id;
    provider.provider_name = provider_name;
    provider.location = location;
    provider.products = products;
    provider.dentists = dentists;
    console.log('New Provider: ',provider);
    try {
      await provider.save();
      return provider;
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }
}
