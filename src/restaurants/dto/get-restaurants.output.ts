import { ObjectType } from '@nestjs/graphql';
import { CommonResponse } from 'src/common/CommonResponse';

import { Restaurant } from '../restaurant.entity';

@ObjectType()
export class GetRestaurantsOutput extends CommonResponse<Restaurant>(
  Restaurant,
  true,
) {}
