import { Injectable } from '@nestjs/common';

import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { CreateRestaurantOutput } from './dto/create-restaurant.output';
import { GetRestaurantsOutput } from './dto/get-restaurants.output';
import { UpdateRestaurantInput } from './dto/update-restaurant.input';
import { UpdateRestaurantOutput } from './dto/update-restaurant.output';
import { RestaurantsRepository } from './restaurants.repository';

@Injectable()
export class RestaurantsService {
  constructor(private readonly restaurantsRepository: RestaurantsRepository) {}

  async restaurants(): Promise<GetRestaurantsOutput> {
    try {
      return {
        success: true,
        data: await this.restaurantsRepository.find(),
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async createRestaurant(
    createRestaurantInput: CreateRestaurantInput,
  ): Promise<CreateRestaurantOutput> {
    try {
      const newRestaurant = this.restaurantsRepository.create(
        createRestaurantInput,
      );
      return {
        ok: true,
        data: this.restaurantsRepository.save(newRestaurant),
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async updateRestaurant(
    updateRestaurantInput: UpdateRestaurantInput,
  ): Promise<UpdateRestaurantOutput> {
    try {
      const { id, ...restaurant } = updateRestaurantInput;
      const updatingRestaurant = await this.restaurantsRepository.findOneOrFail(
        id,
      );
      return {
        ok: true,
        data: this.restaurantsRepository.save({
          ...updatingRestaurant,
          ...restaurant,
        }),
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
