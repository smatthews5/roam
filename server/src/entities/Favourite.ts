import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { City } from './City';
import { User } from './User';

@ObjectType()
@Entity()
export class Favourite extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  cityId: number;

  @Field()
  @Column()
  userId: number;

  @ManyToOne(() => City, (city) => city.favourites)
  city: City;

  @ManyToOne(() => User, (user) => user.favourites)
  user: User;
}
