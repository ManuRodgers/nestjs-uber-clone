import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator';
import { GraphQLUUID } from 'graphql-scalars';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@InputType({ isAbstract: true })
@ObjectType()
@Entity({ name: 'restaurants' })
export class Restaurant {
  @Field(() => GraphQLUUID, { nullable: false })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => String, { nullable: false })
  @Column({ nullable: false })
  @IsString()
  @IsNotEmpty()
  @Length(5)
  name!: string;

  @Field(() => Boolean, { nullable: false })
  @Column({ nullable: false })
  @IsNotEmpty()
  @IsBoolean()
  isVegan!: boolean;

  @Field(() => String, { nullable: false })
  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  address!: string;

  @Field(() => String, { nullable: false })
  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  ownersName!: string;

  @Field(() => String, { nullable: false })
  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  categoryName!: string;
}
