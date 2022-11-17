import { Injectable, Inject } from '@nestjs/common';
import { TransactionCreatedEvent } from './events/transaction_created.event';
import { Client as ClientPostgreSQL } from 'pg';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class AppService {
  constructor(@Inject('PG') private readonly clientPg: ClientPostgreSQL) {}
  handleTransactionStatus(
    transactionCreatedEvent: TransactionCreatedEvent,
  ): Observable<any> {
    return of(1).pipe(
      map(() => {
        console.log('transaccion - mensaje recibido', transactionCreatedEvent);
      }),
      switchMap(() =>
        this.clientPg.query(
          'UPDATE Transactions SET transactionStatus = $1 WHERE transactionExternalId = $2 RETURNING *',
          [
            transactionCreatedEvent.transactionStatus,
            transactionCreatedEvent.transactionExternalId,
          ],
        ),
      ),
      map(() => {
        console.log('Update transaction Status event');
        return transactionCreatedEvent;
      }),
    );
  }
}
