import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Store } from '../stores/store.entity';
import { Rating } from 'src/ratings/ratings.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateStoreDto } from './dto/create-store.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Store) private storeRepo: Repository<Store>,
    @InjectRepository(Rating) private ratingRepo: Repository<Rating>
  ) {}

  async createUser(dto: CreateUserDto) {
  const existing = await this.userRepo.findOne({ where: { email: dto.email } });
  if (existing) throw new Error('Email already registered');

  const hashedPassword = await bcrypt.hash(dto.password, 10);
  const user = this.userRepo.create({
    ...dto,
    password: hashedPassword,
  });
  return this.userRepo.save(user);
}

async createStore(dto: CreateStoreDto) {
  const owner = await this.userRepo.findOne({ where: { id: dto.ownerId, role: 'store-owner' } });
  if (!owner) throw new Error('Store owner not found');

  const store = this.storeRepo.create({
    name: dto.name,
    address: dto.address,
    owner,
  });

  return this.storeRepo.save(store);
}

async getFilteredUsers(filters: any) {
  const { name, email, address, role } = filters;

  const query = this.userRepo.createQueryBuilder('user');

  if (name) query.andWhere('user.name ILIKE :name', { name: `%${name}%` });
  if (email) query.andWhere('user.email ILIKE :email', { email: `%${email}%` });
  if (address) query.andWhere('user.address ILIKE :address', { address: `%${address}%` });
  if (role) query.andWhere('user.role = :role', { role });

  return query.getMany();
}

async getFilteredStores(filters: any) {
  const { name, address } = filters;

  const query = this.storeRepo
    .createQueryBuilder('store')
    .leftJoinAndSelect('store.owner', 'owner')
    .leftJoinAndSelect('store.ratings', 'rating');

  if (name) query.andWhere('store.name ILIKE :name', { name: `%${name}%` });
  if (address) query.andWhere('store.address ILIKE :address', { address: `%${address}%` });

  const stores = await query.getMany();

  return stores.map((store) => {
    const avgRating = store.ratings.length
      ? store.ratings.reduce((a, b) => a + b.value, 0) / store.ratings.length
      : null;

    return {
      id: store.id,
      name: store.name,
      address: store.address,
      ownerName: store.owner?.name,
      ownerEmail: store.owner?.email,
      avgRating: avgRating?.toFixed(2) || 'N/A',
    };
  });
}



  async getMetrics() {
    const totalUsers = await this.userRepo.count();
    const totalStores = await this.storeRepo.count();
    const totalRatings = await this.ratingRepo.count();
    return { totalUsers, totalStores, totalRatings };
  }
}
