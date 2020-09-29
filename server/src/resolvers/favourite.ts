import { Resolver, Query, Arg, Mutation, Int } from 'type-graphql';
import { getConnection } from 'typeorm';
import { Favourite } from '../entities/Favourite';

@Resolver()
export class FavouriteResolver {
  @Query(() => [Favourite])
  async favourites(): Promise<Favourite[]> {
    return Favourite.find();
  }

  @Query(() => [Favourite], { nullable: true })
  async userFavourites(
    @Arg('userId', () => Int) userId: number
  ): Promise<Favourite[] | undefined> {
    const favourites = await getConnection()
      .createQueryBuilder()
      .select('favourite')
      .from(Favourite, 'favourite')
      .where('favourite.userId = :userId', { userId: userId })
      .getMany();
    return favourites;
  }

  @Mutation(() => Boolean)
  async saveFavourite(
    @Arg('userId', () => Int) userId: number,
    @Arg('cityId', () => Int) cityId: number
  ): Promise<boolean> {
    await Favourite.create({
      cityId: cityId,
      userId: userId,
    }).save();
    return true;
  }

  @Mutation(() => Boolean)
  async removeFavourite(
    @Arg('userId', () => Int) userId: number,
    @Arg('cityId', () => Int) cityId: number
  ): Promise<boolean> {
    await Favourite.delete({
      cityId: cityId,
      userId: userId,
    });
    return true;
  }
}
