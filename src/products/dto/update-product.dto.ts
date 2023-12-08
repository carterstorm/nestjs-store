// export interface Product {
//     id: number;
//     name: string;
//     price: number;
//     stock: number;
//     image: string;
//     description?: string;
//   }

import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUrl({ require_protocol: true })
  @IsOptional()
  image?: string;

  @IsNumber()
  @IsInt()
  @IsOptional()
  @IsPositive()
  stock?: number;
}
