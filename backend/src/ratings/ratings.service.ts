import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from './ratings.entity';
import { Store } from '../stores/store.entity';
import { User } from '../users/user.entity';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepo: Repository<Rating>,
  ) {}

  async submitRating({ storeId, userId, value }) {
    const existing = await this.ratingRepo.findOne({
      where: {
        user: { id: userId },
        store: { id: storeId },
      },
      relations: ['user', 'store'],
    });

    if (existing) {
      existing.value = value;
      return this.ratingRepo.save(existing);
    }

    const rating = this.ratingRepo.create({
      value,
      store: { id: storeId },
      user: { id: userId },
    });

    return this.ratingRepo.save(rating);
  }
}
