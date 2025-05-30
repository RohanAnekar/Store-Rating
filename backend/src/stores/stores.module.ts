import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // ✅ add this
import { Store } from './store.entity'; // ✅ add this

import { StoresService } from './stores.service';

@Module({
  imports: [TypeOrmModule.forFeature([Store])],
  providers: [StoresService],
  exports: [StoresService], // ✅ export so other modules can use it
})
export class StoresModule {}
