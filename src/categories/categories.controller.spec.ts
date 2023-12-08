import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';

describe('CategoriesController', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
    }).compile();

    controller = app.get<CategoriesController>(CategoriesController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
