import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { Rating } from './ratings.entity';
import { User } from '../users/user.entity';
import { Store } from '../stores/store.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rating, Store, User])],
  controllers: [RatingsController],
  providers: [RatingsService],
})
export class RatingsModule {}
