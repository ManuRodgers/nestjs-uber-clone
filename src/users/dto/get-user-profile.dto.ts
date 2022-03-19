import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { GraphQLUUID } from 'graphql-scalars';
import { CommonResponse } from 'src/common/CommonResponse';
import { User } from '../entities/user.entity';

@InputType()
export class GetUserProfileInput {
  @Field(() => GraphQLUUID, { nullable: false })
  @IsUUID()
  id!: string;
}

@ObjectType()
export class GetUserProfileOutput extends CommonResponse<User>(User) {}
