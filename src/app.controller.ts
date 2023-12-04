import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { NewCategoryDto } from './new-category.dto';

type TCategory = {
  id: number;
  name: string;
};
@Controller('categories')
export class AppController {
  private categories: TCategory[] = [
    { id: 1, name: 'Groceries' },
    { id: 2, name: 'Cosmetics' },
    { id: 3, name: 'Toys' },
    { id: 4, name: 'Dairy' },
    { id: 5, name: 'Fashion' },
    { id: 6, name: 'Electronics' },
    { id: 7, name: 'Games' },
  ];

  @Get()
  getAllCategories() {
    return this.categories;
  }

  @Get(':id')
  getSingleCategory(@Param('id') categoryId: number) {
    const category = this.categories.find(({ id }) => id === categoryId);
    if (!category) {
      throw new NotFoundException(`Category with id: ${categoryId} not found`);
    }
    return category;
  }

  @Post()
  addNewCategory(@Body() payload: NewCategoryDto) {
    const category: TCategory = {
      id:
        this.categories.length === 0
          ? 1
          : this.categories[this.categories.length - 1].id + 1,
      ...payload,
    };
    this.categories.push(category);
    return category;
  }

  @Delete(':name')
  deleteCategory(@Param('name') categoryName: string): { message: string } {
    this.categories = this.categories.filter(
      ({ name }) => name !== categoryName,
    );
    return {
      message: `${categoryName} deleted`,
    };
  }
}
