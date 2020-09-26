import { Resolver, Query, Arg, Mutation, InputType, Field } from 'type-graphql';
import { City } from '../entities/City';

@InputType()
class CityDetailsInput {
  @Field()
  name: string;
  @Field()
  timezone: string;
  @Field()
  imageUrl: string;
}

@Resolver()
export class CityResolver {
  @Query(() => [City])
  async cities(): Promise<City[]> {
    return City.find();
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
    }).save();
  }

  @Mutation(() => City, { nullable: true })
  async updateCity(
    @Arg('id') id: number,
    @Arg('name', () => String, { nullable: true }) name: string,
    @Arg('timezone', () => String, { nullable: true }) timezone: string,
    @Arg('imageUrl', () => String, { nullable: true }) imageUrl: string
  ): Promise<City | null> {
    const city = await City.findOne(id);
    if (!city) {
      return null;
    }
    if (typeof name !== undefined) {
      city.name = name;
    }
    if (typeof timezone !== undefined) {
      city.timezone = timezone;
    }
    if (typeof imageUrl !== undefined) {
      city.imageUrl = imageUrl;
    }
    await City.update({ id }, { name, timezone, imageUrl });
    return city;
  }

  @Mutation(() => Boolean)
  async deleteCity(@Arg('id') id: number): Promise<boolean> {
    await City.delete(id);
    return true;
  }
}
