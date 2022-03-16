import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateRestaurantInput } from './create-restaurant.input';
import { GraphQLUUID } from 'graphql-scalars';
import { IsUUID } from 'class-validator';

@InputType()
export class UpdateRestaurantInput extends PartialType(CreateRestaurantInput) {
  @Field(() => GraphQLUUID, { nullable: false })
  @IsUUID()
  id!: string;
}
