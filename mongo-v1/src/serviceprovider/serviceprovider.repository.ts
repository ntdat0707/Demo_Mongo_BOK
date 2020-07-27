
import { ServiceProvider } from './serviceprovider.entity';
import { Repository, EntityRepository } from 'typeorm';
import { CreateServiceProviderDTO } from './middleware/create-serviceprovider-dto';
import { CreateProductDTO } from 'src/products/middleware/create-product-dto';
import { Product } from 'src/products/product.entity';
import { Dentist } from 'src/dentist/dentist.entity';
import { CreateDentistDTO } from 'src/dentist/middleware/create-dentist-dto';
import { InternalServerErrorException } from '@nestjs/common';

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
    provider.provider_id = provider_id;
    provider.provider_name = provider_name;
    provider.location = location;
    provider.products = products;
    provider.dentists = dentists;

    let product_mess = await this.createProduct(products);
    let dentist_mess = await this.createDentist(dentists);

    console.log(product_mess);
    console.log(dentist_mess);

    try {
      await provider.save();
      return provider;
    } catch (error) {
      throw new InternalServerErrorException('Can not create this provider');
    }
  }

  edit_products() {}
  edit_dentist() {}

  async updateLocation(provider_id: number, location: string) {}

  async getAddresses(selectedCity: string): Promise<string[]> {
    let dentals = await this.getServiceProviders();
    let address: string[] = [];
    for (let dental of dentals) {
      if (dental.location['city'] == selectedCity) {
        address =
          address.length != 0
            ? address.concat(dental.location['addresses'])
            : dental.location['addresses'];
      }
    }
    console.log('Address:', address);
    return address;
  }

  async createProduct(productDTO: CreateProductDTO): Promise<string> {
    const { product_id, product_kind, product_price_quote } = productDTO;
    const product = new Product();
    product.product_id = product_id;
    product.product_kind = product_kind;
    product.product_price_quote = product_price_quote;
    await product.save();
    return await 'New product created';
  }

  async createDentist(dentistDTO: CreateDentistDTO): Promise<string> {
    const {
      dentist_id,
      dentist_name,
      dentist_email,
      dentist_phone,
    } = dentistDTO;
    const dentist = new Dentist();
    dentist.dentist_id = dentist_id;
    dentist.dentist_name = dentist_name;
    dentist.dentist_email = dentist_email;
    dentist.dentist_phone = dentist_phone;
    await dentist.save();
    return await 'New dentist created';
  }

  async getServiceProviders(): Promise<ServiceProvider[]> {
    return this.find();
  }
}
