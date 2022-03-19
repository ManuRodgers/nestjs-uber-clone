import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommonResponseOutput {
  @Field(() => Boolean, {
    nullable: false,
  })
  ok!: boolean;

  @Field(() => String, {
    nullable: true,
  })
  error?: string;
}
