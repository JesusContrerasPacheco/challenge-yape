import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Transaction {
  @Field()
  transactionExternalId: string;

  @Field()
  transactionType: string;

  @Field()
  transactionStatus: string;

  @Field(() => Float)
  value: number;

  @Field()
  createdAt: string;
}
