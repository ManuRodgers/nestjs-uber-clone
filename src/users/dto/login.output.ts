import { ObjectType } from '@nestjs/graphql';

import { CommonResponse } from '../../common/CommonResponse';
import { TokensOutput } from './tokens.output';

@ObjectType()
export class LoginOutput extends CommonResponse<TokensOutput>(TokensOutput) {}
