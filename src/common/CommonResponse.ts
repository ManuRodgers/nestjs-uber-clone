import { Field, ObjectType } from '@nestjs/graphql';
import { ClassConstructor } from 'class-transformer';
import { GraphQLScalarType } from 'graphql';

export function CommonResponse<T = any>(
  classType: ClassConstructor<T> | GraphQLScalarType,
  isList = false,
) {
  if (isList) {
    @ObjectType({ isAbstract: true })
    abstract class CommonResponseClass {
      @Field(() => Boolean, { nullable: false })
      ok!: boolean;

      @Field(() => String, { nullable: true })
      error?: Error;

      @Field(() => [classType], { nullable: true })
      data?: T[];
    }
    return CommonResponseClass;
  } else {
    @ObjectType({ isAbstract: true })
    abstract class CommonResponseClass {
      @Field(() => Boolean, { nullable: false })
      ok!: boolean;

      @Field(() => String, { nullable: true })
      error?: Error;

      @Field(() => classType, { nullable: true })
      data?: T;
    }
    return CommonResponseClass;
  }
}
