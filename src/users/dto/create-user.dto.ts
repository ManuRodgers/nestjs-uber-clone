import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CommonResponse } from '../../common/CommonResponse';
import { User } from '../entities/user.entity';

@InputType()
export class CreateUserInput extends PickType(User, [
  'email',
  'password',
  'role',
]) {}

@ObjectType()
export class CreateUserOutput extends CommonResponse<User>(User) {}
