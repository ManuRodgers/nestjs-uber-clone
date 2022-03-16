import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const AuthUser = createParamDecorator(
  (data: unknown, contest: ExecutionContext) => {
    return GqlExecutionContext.create(contest).getContext().user;
  },
);
