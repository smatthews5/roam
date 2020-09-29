import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

@ObjectType()
@Entity()
export class Checklist extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  userId!: number;

  @Field()
  @Column({
    default: false,
  })
  accomodation!: boolean;

  @Field()
  @Column({
    default: false,
  })
  bank!: boolean;

  @Field()
  @Column({
    default: false,
  })
  medical!: boolean;

  @Field()
  @Column({
    default: false,
  })
  workspace!: boolean;

  @Field()
  @Column({
    default: false,
  })
  visa!: boolean;

  @OneToOne(() => User, (user) => user.checklist)
  user: User;
}
