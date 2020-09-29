import { Checklist } from '../entities/Checklist';
import {
  Resolver,
  Query,
  Arg,
  Mutation,
  InputType,
  Field,
  Int,
} from 'type-graphql';
import { getConnection } from 'typeorm';

@Resolver()
export class ChecklistResolver {
  @Query(() => [Checklist])
  async checklists(): Promise<Checklist[]> {
    return Checklist.find();
  }

  @Mutation(() => Checklist)
  async createChecklist(
    @Arg('userId', () => Int) userId: number
  ): Promise<Checklist> {
    return Checklist.create({
      userId: userId,
    }).save();
  }

  @Mutation(() => Checklist)
  async updateWorkspace(
    @Arg('userId', () => Int) userId: number,
    @Arg('field', () => String) field: string,
    @Arg('value', () => Boolean) value: boolean
  ): Promise<Checklist | undefined> {
    await getConnection()
      .createQueryBuilder()
      .update(Checklist)
      .set({
        [field]: value,
      })
      .where('userId = :userId', { userId: userId })
      .execute();
    return Checklist.findOne(userId);
  }

  @Query(() => Checklist, { nullable: true })
  checklist(
    @Arg('userId', () => Int) userId: number
  ): Promise<Checklist | undefined> {
    return Checklist.findOne(userId);
  }
}
