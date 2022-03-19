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
import { BeforeInsert, BeforeUpdate, Column, Entity, Unique } from 'typeorm';

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
  @Column({ nullable: false, select: false })
  @IsNotEmpty()
  password!: string;

  @Field(() => Boolean, { nullable: false })
  @Column({ nullable: false, default: false })
  verified!: boolean;

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
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    try {
      console.log('-> this.password', this.password);
      if (this.password) {
        this.password = await hash(this.password);
      }
    } catch (error) {
      throw new InternalServerErrorException('Error hashing password');
    }
  }

  async comparePassword(
    hashedPassword: string,
    password: string,
  ): Promise<boolean> {
    try {
      return verify(hashedPassword, password);
    } catch (error) {
      throw new InternalServerErrorException('Error comparing password');
    }
  }
}
