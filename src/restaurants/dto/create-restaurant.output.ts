import { ObjectType } from '@nestjs/graphql';
import { CommonResponse } from 'src/common/CommonResponse';

import { Restaurant } from '../restaurant.entity';

@ObjectType()
export class CreateRestaurantOutput extends CommonResponse<Restaurant>(
  Restaurant,
) {}
