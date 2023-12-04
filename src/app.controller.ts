import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

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
  getSingleCategory(@Param('id') categoryId: string) {
    return this.categories.find(({ id }) => id === Number(categoryId));
  }

  @Post()
  addNewCategory(@Body() payload: { name: string }) {
    const category: TCategory = { id: this.categories.length + 1, ...payload };
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
