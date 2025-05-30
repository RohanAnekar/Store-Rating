import { Controller, Get } from '@nestjs/common';
import { StoresService } from '../stores/stores.service';

@Controller('user')
export class UsersController {
  constructor(private readonly storesService: StoresService) {}

  @Get('stores')
  async getAllStores() {
    return this.storesService.findAll();
  }
}
