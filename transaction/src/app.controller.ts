import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { TransactionCreatedEvent } from './events/transaction_created.event';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('transaction_status')
  handleTransactionStatus(data: TransactionCreatedEvent): Observable<any> {
    return this.appService.handleTransactionStatus(data);
  }
}
