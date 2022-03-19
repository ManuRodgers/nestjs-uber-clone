import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLUUID } from 'graphql-scalars';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
export class CommonEntity {
  @Field(() => GraphQLUUID, { nullable: false })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => Date, { nullable: false })
  @CreateDateColumn({ nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  @UpdateDateColumn({ nullable: false })
  updatedAt!: Date;
}
