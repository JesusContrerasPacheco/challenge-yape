import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CreateTransactionInput } from './dto/input/create-transaction.input';

import { Transaction } from './models/transaction';
import { TransactionsService } from './transactions.service';
import { GetTransactionArgs } from './dto/args/get-transaction.args';
import { Observable } from 'rxjs';

@Resolver(() => Transaction)
export class TransactionsResolver {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Query(() => Transaction, { name: 'transaction', nullable: true })
  getUsers(
    @Args() getTransactionArgs: GetTransactionArgs,
  ): Observable<Transaction> {
    return this.transactionsService.getTransaction(getTransactionArgs);
  }

  @Mutation(() => Transaction)
  createTransaction(
    @Args('createTransactionData')
    createTransactionData: CreateTransactionInput,
  ): Observable<Transaction> {
    return this.transactionsService.createTransaction(createTransactionData);
  }
}
