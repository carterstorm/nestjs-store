import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { NewProductDto } from './dto/new-product.dto';
import { Product } from './product.interface';
import { productList } from './product-list';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  private products: Product[] = productList;

  private findProduct = (productId: number) => {
    const foundedProduct = this.products.find(({ id }) => id === productId);

    if (!foundedProduct) {
      throw new NotFoundException(`Category with id: ${productId} not found`);
    }
    return foundedProduct;
  };

  @Post()
  createProduct(@Body() payload: NewProductDto): Product {
    const product: Product = {
      id:
        this.products.length === 0
          ? 1
          : this.products[this.products.length - 1].id + 1,
      ...payload,
    };
    this.products.push(product);
    return product;
  }

  @Get()
  getAllProducts() {
    return this.products;
  }

  @Get(':id')
  getOneProduct(@Param('id') productId: number) {
    return this.findProduct(productId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') productId: number,
    @Body() product: UpdateProductDto,
  ) {
    const productToUpdate = this.findProduct(productId);
    Object.assign(productToUpdate, product);
    return productToUpdate;
  }

  @Delete(':id')
  deleteProduct(@Param('id') productId: number) {
    this.findProduct(productId);
    return (this.products = this.products.filter(({ id }) => id !== productId));
  }
}
