import { ObjectType } from '@nestjs/graphql';

import { CommonResponse } from '../../common/CommonResponse';
import { User } from '../entities/user.entity';

@ObjectType()
export class CreateUserOutput extends CommonResponse<User>(User) {}
