import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { NewCategoryDto } from './dto/new-category.dto';
import { Category } from './category.interface';
import { categoriesList } from './categories-list';

@Controller('categories')
export class CategoriesController {
  private categories: Category[] = categoriesList;

  private getCategory = (categoryId: number) => {
    const searchCategory = this.categories.find(({ id }) => id === categoryId);

    if (!searchCategory) {
      throw new NotFoundException(`Category with id: ${categoryId} not found`);
    }
    return searchCategory;
  };

  @Get()
  getAllCategories() {
    return this.categories;
  }

  @Get(':id')
  getSingleCategory(@Param('id') categoryId: number) {
    const singleCategory = this.getCategory(categoryId);

    return singleCategory;
  }

  @Post()
  addNewCategory(@Body() payload: NewCategoryDto) {
    const category: Category = {
      id:
        this.categories.length === 0
          ? 1
          : this.categories[this.categories.length - 1].id + 1,
      ...payload,
    };
    this.categories.push(category);
    return category;
  }

  @Delete(':id')
  deleteCategory(@Param('id') categoryId: number) {
    this.getCategory(categoryId);

    return (this.categories = this.categories.filter(
      ({ id }) => id !== categoryId,
    ));
  }
}
