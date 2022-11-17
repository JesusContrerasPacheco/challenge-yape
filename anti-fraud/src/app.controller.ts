import { Controller } from '@nestjs/common';
import { MessagePattern, EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { TransactionCreatedEvent } from './events/transaction_created.event';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @MessagePattern('transaction_created')
  @EventPattern('transaction_created')
  handleTransactionCreated(data: TransactionCreatedEvent): Observable<any> {
    return this.appService.handleTransactionCreated(data);
  }
}
