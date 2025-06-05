import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { StoresModule } from './stores/stores.module';
import { RatingsModule } from './ratings/ratings.module';
import { AuthModule } from './auth/auth.module';

import { User } from './users/user.entity';
import { Store } from './stores/store.entity';
import { Rating } from './ratings/ratings.entity';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'newpassword',
      database: 'store_db',
      entities: [User, Store, Rating], // ✅ Include all entities here
      synchronize: true, // Set to false in production
    }),
    UsersModule,
    StoresModule,
    RatingsModule,
    AuthModule,
    AdminModule,
  ],
})
export class AppModule {}
