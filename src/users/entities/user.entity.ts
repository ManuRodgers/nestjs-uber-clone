import { InternalServerErrorException } from '@nestjs/common';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { hash, verify } from 'argon2';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { GraphQLEmailAddress } from 'graphql-scalars';
import { CommonEntity } from 'src/common/entities/common.entity';
import { BeforeInsert, Column, Entity, Unique } from 'typeorm';

enum UserRole {
  CLIENT,
  OWNER,
  DELIVERY,
}
registerEnumType(UserRole, { name: 'UserRole' });

@InputType({ isAbstract: true })
@ObjectType()
@Entity({ name: 'users' })
@Unique(['email'])
export class User extends CommonEntity {
  @Field(() => GraphQLEmailAddress, { nullable: false })
  @Column({ nullable: false })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @Field(() => String, { nullable: false })
  @Column({ nullable: false })
  @IsNotEmpty()
  password!: string;

  @Field(() => UserRole, { nullable: false })
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CLIENT,
    nullable: false,
  })
  @IsNotEmpty()
  @IsEnum(UserRole)
  role!: UserRole;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    try {
      this.password = await hash(this.password);
    } catch (error) {
      throw new InternalServerErrorException('Error hashing password');
    }
  }

  async comparePassword(password: string): Promise<boolean> {
    try {
      return verify(this.password, password);
    } catch (error) {
      throw new InternalServerErrorException('Error comparing password');
    }
  }
}
