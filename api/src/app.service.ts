import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { forkJoin, iif, Observable, of } from 'rxjs';
import { switchMap, map, mergeMap } from 'rxjs/operators';
import { TransactionCreatedEvent } from './events/transaction_created.event';

@Injectable()
export class AppService {
  constructor(
    @Inject('TRANSACTION_SERVICE') private readonly clientKafka: ClientKafka,
  ) {}

  registerTransaction(): Observable<any> {
    console.log('actualizando trx...');
    return of(1);
  }

  createTransaction(data): Observable<any> {
    return of(1).pipe(
      map(() => console.log('creando trx pendiente...')),
      switchMap(() =>
        this.clientKafka.send(
          'transaction_created',
          new TransactionCreatedEvent(
            data.accountExternalIdDebit,
            data.accountExternalIdCredit,
            data.value,
          ).toString(),
        ),
      ),
      map((obj: any) => {
        this.registerTransaction();
        return obj.message === 'success';
      }),
      map((isValidTransaction: boolean) => {
        console.log('result ', isValidTransaction);
        if (!isValidTransaction) {
          throw new BadRequestException('Monto invalido');
        }
        return {
          message: 'transaccion exitosa!',
        };
      }),
    );
    /*return this.clientKafka.send(
      'transaction_created',
      new TransactionCreatedEvent(
        data.accountExternalIdDebit,
        data.accountExternalIdCredit,
        data.tranferTypeId,
        data.value,
      ).toString(),
    );*/
  }
}
