import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TokensOutput {
  @Field(() => String, { nullable: false })
  accessToken!: string;
}
