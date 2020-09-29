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
import { City } from '../entities/City';

@InputType()
class CityDetailsInput {
  @Field()
  name: string;
  @Field()
  timezone: string;
  @Field()
  imageUrl: string;
  @Field()
  climate: string;
  @Field()
  lifestyle: string;
}

@InputType()
class CityFilters {
  @Field()
  timezone: string;
  @Field()
  name: string;
}

@Resolver()
export class CityResolver {
  @Query(() => [City])
  async cities(): Promise<City[]> {
    return City.find();
  }

  @Query(() => [City])
  async citiesFiltered(
    @Arg('options', () => CityFilters) options: CityFilters
  ): Promise<City[]> {
    const cities = await getConnection()
      .createQueryBuilder()
      .select('city')
      .from(City, 'city')
      .where('city.timezone = :timezone', { timezone: options.timezone })
      .andWhere('city.name = :name', { name: options.name })
      .getMany();
    return cities;
  }

  @Query(() => City, { nullable: true })
  city(@Arg('id') id: number): Promise<City | undefined> {
    return City.findOne(id);
  }

  @Mutation(() => City)
  async createCity(
    @Arg('options', () => CityDetailsInput) options: CityDetailsInput
  ): Promise<City> {
    return City.create({
      name: options.name,
      timezone: options.timezone,
      imageUrl: options.imageUrl,
      climate: options.climate,
      lifestyle: options.lifestyle,
    }).save();
  }

  @Mutation(() => City, { nullable: true })
  async updateCity(
    @Arg('id') id: number,
    @Arg('name', () => String, { nullable: true }) name: string,
    @Arg('timezone', () => String, { nullable: true }) timezone: string,
    @Arg('climate', () => String, { nullable: true }) climate: string,
    @Arg('lifestyle', () => String, { nullable: true }) lifestyle: string,
    @Arg('imageUrl', () => String, { nullable: true }) imageUrl: string
  ): Promise<City | null> {
    const city = await City.findOne(id);
    if (!city) {
      return null;
    }
    await City.update({ id }, { name, timezone, imageUrl, climate, lifestyle });
    return city;
  }

  @Mutation(() => Boolean)
  async deleteCity(@Arg('id') id: number): Promise<boolean> {
    await City.delete(id);
    return true;
  }

  @Query(() => [City], { nullable: true })
  async citiesFavourite(
    @Arg('userId', () => Int) userId: number
  ): Promise<City[] | undefined> {
    const cities = await getConnection()
      .createQueryBuilder()
      .select('city')
      .from(City, 'city')
      .innerJoinAndSelect('city.favourites', 'favourites')
      .where('favourites.userId = :userId', { userId: userId })
      .getMany();
    return cities;
  }
}
