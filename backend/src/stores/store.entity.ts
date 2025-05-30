import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Rating } from 'src/ratings/ratings.entity';

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @ManyToOne(() => User, user => user.stores)
  owner: User;

  @OneToMany(() => Rating, rating => rating.store)
  ratings: Rating[];
}
