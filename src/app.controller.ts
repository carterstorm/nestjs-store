import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello World';
  }

  @Get('cat/:catId')
  getMyCat(): { name: string; id: number } {
    return { name: 'Killer', id: 100 };
  }
}
