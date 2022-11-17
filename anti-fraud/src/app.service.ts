import { Injectable, Inject } from '@nestjs/common';
import { TransactionCreatedEvent } from './events/transaction_created.event';
import { ClientKafka } from '@nestjs/microservices';
import { of, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class AppService {
  constructor(
    @Inject('TRANSACTION_SERVICE') private readonly clientKafka: ClientKafka,
  ) {}

  handleTransactionCreated(
    transactionCreatedEvent: TransactionCreatedEvent,
  ): Observable<any> {
    console.log('antifraude - mensaje recibido', transactionCreatedEvent);
    return of(1).pipe(
      map(() =>
        transactionCreatedEvent.amount > 1000 ? 'rejected' : 'approved',
      ),
      map((status: string) => {
        this.clientKafka.emit(
          'transaction_status',
          new TransactionCreatedEvent(
            transactionCreatedEvent.transactionExternalId,
            status,
            transactionCreatedEvent.amount,
          ).toString(),
        );
        console.log(`Send transaction Status ${status} event`);
      }),
    );
  }
}
