import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from './store.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepo: Repository<Store>
  ) {}

  async findAll(): Promise<Store[]> {
    return this.storeRepo.find({
      relations: ['owner', 'ratings'], // optional: load relations
    });
  }
}
