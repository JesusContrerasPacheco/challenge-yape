import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class GetTransactionArgs {
  @Field()
  @IsNotEmpty()
  transactionExternalId: string;
}
