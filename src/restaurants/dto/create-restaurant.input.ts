import { InputType, OmitType } from '@nestjs/graphql';
import { Restaurant } from '../restaurant.entity';

@InputType()
export class CreateRestaurantInput extends OmitType(Restaurant, ['id']) {}
