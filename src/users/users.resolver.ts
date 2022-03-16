import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserOutput } from './dto/create-user.output';
import { LoginOutput } from './dto/login.output';
import { LoginInput } from './dto/login.input';
import { MeOutput } from './dto/me.output';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { AuthUser } from './user.decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => CreateUserOutput)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<CreateUserOutput> {
    return this.usersService.createUser(createUserInput);
  }

  @Mutation(() => LoginOutput)
  async login(
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<LoginOutput> {
    return this.usersService.login(loginInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => MeOutput, { name: 'me' })
  @UseGuards(AuthGuard)
  async me(@AuthUser() authUser: User): Promise<MeOutput> {
    if (authUser) {
      return {
        ok: true,
        data: authUser,
      };
    }
    return {
      ok: false,
      error: 'Not authenticated',
    };
  }
}
