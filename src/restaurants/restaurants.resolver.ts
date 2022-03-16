import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { CreateRestaurantOutput } from './dto/create-restaurant.output';
import { GetRestaurantsOutput } from './dto/get-restaurants.output';
import { UpdateRestaurantInput } from './dto/update-restaurant.input';
import { UpdateRestaurantOutput } from './dto/update-restaurant.output';
import { Restaurant } from './restaurant.entity';
import { RestaurantsService } from './restaurants.service';

@Resolver(() => Restaurant)
export class RestaurantsResolver {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Query(() => GetRestaurantsOutput, { name: 'restaurants' })
  async restaurants(): Promise<GetRestaurantsOutput> {
    return this.restaurantsService.restaurants();
  }

  @Mutation(() => CreateRestaurantOutput)
  async createRestaurant(
    @Args('createRestaurantInput') createRestaurantInput: CreateRestaurantInput,
  ) {
    return this.restaurantsService.createRestaurant(createRestaurantInput);
  }

  @Mutation(() => UpdateRestaurantOutput)
  async updateRestaurant(
    @Args('updateRestaurantInput') updateRestaurantInput: UpdateRestaurantInput,
  ): Promise<UpdateRestaurantOutput> {
    return this.restaurantsService.updateRestaurant(updateRestaurantInput);
  }
}
