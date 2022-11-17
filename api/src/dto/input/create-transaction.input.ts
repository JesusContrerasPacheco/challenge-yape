import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsPositive, IsNumber } from 'class-validator';

@InputType()
export class CreateTransactionInput {
  @Field()
  @IsNotEmpty()
  accountExternalIdDebit: string;

  @Field()
  @IsNotEmpty()
  accountExternalIdCredit: string;

  @Field()
  @IsNotEmpty()
  @IsNumber()
  tranferTypeId: number;

  @Field()
  @IsNotEmpty()
  @IsPositive()
  value: number;
}
