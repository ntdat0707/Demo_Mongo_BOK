import { ServiceProvider } from './serviceprovider.entity';
import { Repository, EntityRepository } from 'typeorm';
import { CreateServiceProviderDTO } from './middleware/create-serviceprovider-dto';
import { Product } from 'src/products/product.entity';

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
      products,
      dentists,
    } = createProviderDTO;

    const provider = new ServiceProvider();
    let testproduct = new Product();
    testproduct = products;
    provider.provider_id = provider_id;
    provider.provider_name = provider_name;
    provider.location = location;
    provider.products = products;
    provider.dentists = dentists;
    try {
      await provider.save();
      return provider;
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }
}
