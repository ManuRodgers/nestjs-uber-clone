import { Restaurant } from './restaurant.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Restaurant)
export class RestaurantsRepository extends Repository<Restaurant> {}
