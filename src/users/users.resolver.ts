import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthGuard } from '../auth/auth.guard';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UpdateUserInput, UpdateUserOutput } from './dto/update-user.dto';
import { AuthUser } from './decorators/user.decorator';
import { CreateUserInput, CreateUserOutput } from './dto/create-user.dto';
import {
  GetUserProfileInput,
  GetUserProfileOutput,
} from './dto/get-user-profile.dto';
import { LoginInput, LoginOutput } from './dto/login.dto';
import { VerifyEmailInput, VerifyEmailOutput } from './dto/verify-email.dto';

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

  @Query(() => GetUserProfileOutput, { name: 'me' })
  @UseGuards(AuthGuard)
  async me(@AuthUser() authUser: User): Promise<GetUserProfileOutput> {
    return authUser;
  }

  @Query(() => GetUserProfileOutput)
  @UseGuards(AuthGuard)
  async getUserProfile(
    @Args('getUserProfileInput') getUserProfileInput: GetUserProfileInput,
  ): Promise<GetUserProfileOutput> {
    return this.usersService.getUserProfile(getUserProfileInput.id);
  }

  @Mutation(() => UpdateUserOutput)
  @UseGuards(AuthGuard)
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @AuthUser() authUser: User,
  ): Promise<UpdateUserOutput> {
    const { id: userId } = authUser;
    return this.usersService.updateUser(userId, updateUserInput);
  }

  @Mutation(() => VerifyEmailOutput)
  async verifyEmail(
    @Args('verifyEmailInput') verifyEmailInput: VerifyEmailInput,
  ): Promise<VerifyEmailOutput> {
    return await this.usersService.verifyEmail(verifyEmailInput);
  }
}
