import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Favourite } from './Favourite';

@ObjectType()
@Entity()
export class City extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  timezone: string;

  @Field()
  @Column()
  imageUrl: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  climate: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lifestyle: string;

  @OneToMany(() => Favourite, (favourite) => favourite.city)
  favourites: Favourite[];
}
