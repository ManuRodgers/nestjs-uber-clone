import { Module } from '@nestjs/common';

import { RestaurantsResolver } from './restaurants.resolver';
import { RestaurantsService } from './restaurants.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantsRepository } from './restaurants.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantsRepository])],
  providers: [RestaurantsResolver, RestaurantsService],
})
export class RestaurantsModule {}
