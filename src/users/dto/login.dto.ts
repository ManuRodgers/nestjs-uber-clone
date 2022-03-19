import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CommonResponse } from 'src/common/CommonResponse';

import { User } from '../entities/user.entity';
import { TokensOutput } from './tokens.output';

@InputType()
export class LoginInput extends PickType(User, ['email', 'password']) {}

@ObjectType()
export class LoginOutput extends CommonResponse<TokensOutput>(TokensOutput) {}
