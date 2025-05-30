import { Controller, Get, UseGuards, Body, Post, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateStoreDto } from './dto/create-store.dto';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('create-user')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
createUser(@Body() body: CreateUserDto) {
  return this.adminService.createUser(body);
}

@Post('create-store')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
createStore(@Body() body: CreateStoreDto) {
  return this.adminService.createStore(body);
}

@Get('stores')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
getStores(
  @Query('name') name?: string,
  @Query('address') address?: string
) {
  return this.adminService.getFilteredStores({ name, address });
}





@Get('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
getUsers(
  @Query('name') name?: string,
  @Query('email') email?: string,
  @Query('address') address?: string,
  @Query('role') role?: string,
) {
  return this.adminService.getFilteredUsers({ name, email, address, role });
}


  @Get('metrics')
  getMetrics() {
    return this.adminService.getMetrics();
  }
}
