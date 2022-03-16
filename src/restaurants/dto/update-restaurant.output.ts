import { ObjectType } from '@nestjs/graphql';
import { CommonResponse } from 'src/common/CommonResponse';

import { Restaurant } from '../restaurant.entity';

@ObjectType()
export class UpdateRestaurantOutput extends CommonResponse<Restaurant>(
  Restaurant,
) {}
