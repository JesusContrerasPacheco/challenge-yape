import { Injectable, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateTransactionInput } from './dto/input/create-transaction.input';
import { Transaction } from './models/transaction';
import { GetTransactionArgs } from './dto/args/get-transaction.args';
import { v4 as uuidv4 } from 'uuid';
import { TransactionCreatedEvent } from './events/transaction_created.event';
import { Client as ClientPostgreSQL } from 'pg';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactions } from './entities/transactions.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @Inject('TRANSACTION_SERVICE') private readonly clientKafka: ClientKafka,
    @Inject('PG') private readonly clientPg: ClientPostgreSQL,
    @InjectRepository(Transactions)
    private transactionRepo: Repository<Transactions>,
  ) {}

  // private transactions: Transaction[] = [];

  public getTransaction(
    getTransactionArgs: GetTransactionArgs,
  ): Observable<Transaction> {
    return of(1).pipe(
      map(() => console.log('getTransaction....', getTransactionArgs)),
      switchMap(() =>
        this.transactionRepo.findOneBy({
          transactionExternalId: getTransactionArgs.transactionExternalId,
        }),
      ),
      map((trx: Transactions) => {
        const {
          transactionType,
          amount,
          createdAt,
          transactionExternalId,
          transactionStatus,
        } = trx;
        return <Transaction>{
          transactionExternalId,
          transactionType,
          transactionStatus,
          value: amount,
          createdAt,
        };
      }),
    );
  }

  public createTransaction(
    createTransactionData: CreateTransactionInput,
  ): Observable<Transaction> {
    const transaction: Transaction = {
      transactionExternalId: uuidv4(),
      transactionType: 'charge',
      transactionStatus: 'pending',
      value: createTransactionData.value,
      createdAt: String(new Date().valueOf()),
    };
    return of(1).pipe(
      map(() => {
        console.log('Save Transaction with pending Status');
      }),
      switchMap(() =>
        this.clientPg.query(
          'INSERT INTO transactions(transactionExternalId, transactionType, transactionStatus, amount, createdAt) VALUES ( $1, $2, $3, $4, $5 ) RETURNING *',
          [
            transaction.transactionExternalId,
            transaction.transactionType,
            transaction.transactionStatus,
            transaction.value,
            transaction.createdAt,
          ],
        ),
      ),
      map(() => {
        this.clientKafka.emit(
          'transaction_created',
          new TransactionCreatedEvent(
            transaction.transactionExternalId,
            transaction.transactionStatus,
            transaction.value,
          ).toString(),
        );
        console.log('Send transaction Created event');
        return transaction;
      }),
    );
  }
}
