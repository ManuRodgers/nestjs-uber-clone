import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '../jwt/jwt.service';
import { CreateUserInput } from './dto/create-user.input';
import { CreateUserOutput } from './dto/create-user.output';
import { LoginInput } from './dto/login.input';
import { LoginOutput } from './dto/login.output';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
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
      return {
        ok: true,
        data: await this.usersRepository.save(newUser),
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
      const passwordMatch = await user.comparePassword(password);
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
  generateAccessToken(userId: string): string {
    return this.jwtService.sign({ userId });
  }

  async findUserById(userId: string): Promise<User> {
    return await this.usersRepository.findOne(userId);
  }

  findAll() {
    return `This action returns all users`;
  }
}
