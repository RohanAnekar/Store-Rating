import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateStoreDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  address: string;

  @IsNumber()
  ownerId: number;
}
