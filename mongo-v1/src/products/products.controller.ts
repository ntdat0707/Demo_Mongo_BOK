import { Controller, Post, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post()
  createProduct(
    @Query('id') id: number,
    @Query('product_kind') product_kind: string,
    @Query('product_type') product_type: string,
    @Query('product_price') product_price: number,
  ): Promise<Product> {
    return this.productService.createProduct(
      id,
      product_kind,
      product_type,
      product_price,
    );
  }
}
