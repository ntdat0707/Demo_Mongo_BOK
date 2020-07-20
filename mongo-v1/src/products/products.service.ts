import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  async createProduct(
    id: number,
    product_kind: string,
    product_name: string,
    product_price: number,
  ): Promise<Product> {
    const product = new Product();
    product.product_id = id;
    product.product_kind = product_kind;
    product.product_name = product_name;
    product.product_price = product_price;

    try {
      await product.save();
      return product;
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  }
}
