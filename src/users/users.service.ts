import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '../jwt/jwt.service';
import { UpdateUserInput, UpdateUserOutput } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';
import { VerificationsRepository } from './repositories/verification.repository';
import { CreateUserInput, CreateUserOutput } from './dto/create-user.dto';
import { LoginInput, LoginOutput } from './dto/login.dto';
import { VerifyEmailInput, VerifyEmailOutput } from './dto/verify-email.dto';
import { GetUserProfileOutput } from './dto/get-user-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly verificationsRepository: VerificationsRepository,
    private readonly jwtService: JwtService,
  ) {}
  async createUser({
    email,
    password,
    role,
  }: CreateUserInput): Promise<CreateUserOutput> {
    try {
      const existingUser = await this.usersRepository.findOneByEmail(email);
      if (existingUser) {
        throw new Error('User already exists');
      }
      const newUser = this.usersRepository.create({
        email,
        password,
        role,
      });
      const userSaved = await this.usersRepository.save(newUser);
      await this.verificationsRepository.save(
        this.verificationsRepository.create({
          user: userSaved,
        }),
      );
      return {
        ok: true,
        data: userSaved,
      };
    } catch (error) {
      return {
        ok: false,
        error: error,
      };
    }
  }

  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this.usersRepository.findOneByEmail(email);

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const result = await this.usersRepository.findPasswordByUserId(user.id);
      const hashedPassword = result.password;
      const passwordMatch = await user.comparePassword(
        hashedPassword,
        password,
      );
      if (!passwordMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }
      return {
        ok: true,
        data: { accessToken: this.generateAccessToken(user.id) },
      };
    } catch (error) {
      return {
        ok: false,
        error: error,
      };
    }
  }

  async updateUser(
    userId: string,
    { email, password }: UpdateUserInput,
  ): Promise<UpdateUserOutput> {
    try {
      const user = await this.usersRepository.findOne(userId);
      if (!user) {
        throw new Error('User not found');
      }
      if (email) {
        user.email = email;
        user.verified = false;
        await this.verificationsRepository.save(
          this.verificationsRepository.create({
            user,
          }),
        );
      }
      if (password) {
        user.password = password;
      }
      return {
        ok: true,
        data: await this.usersRepository.save(user),
      };
    } catch (error) {
      return {
        ok: false,
        error: error,
      };
    }
  }

  generateAccessToken(userId: string): string {
    return this.jwtService.sign({ userId });
  }

  async getUserProfile(userId: string): Promise<GetUserProfileOutput> {
    try {
      const foundUser = await this.usersRepository.findOne(userId);
      if (!foundUser) {
        throw new Error('User not found');
      }
      return {
        ok: true,
        data: foundUser,
      };
    } catch (error) {
      return {
        ok: false,
        error: error,
      };
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async verifyEmail({ code }: VerifyEmailInput): Promise<VerifyEmailOutput> {
    try {
      const verification = await this.verificationsRepository.findOne({
        where: { code },
        relations: ['user'],
      });
      if (!verification) {
        throw new Error('Verification code not found');
      }
      verification.user.verified = true;
      await this.usersRepository.save(verification.user);
      const deleteResult = await this.verificationsRepository.delete(
        verification.id,
      );
      console.log('-> deleteResult', deleteResult);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: error,
      };
    }
  }
}
