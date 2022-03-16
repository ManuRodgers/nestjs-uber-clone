import { ObjectType } from '@nestjs/graphql';
import { CommonResponse } from '../../common/CommonResponse';
import { User } from '../entities/user.entity';

@ObjectType()
export class MeOutput extends CommonResponse<User>(User) {}
