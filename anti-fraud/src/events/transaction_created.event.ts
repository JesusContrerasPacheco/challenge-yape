export class TransactionCreatedEvent {
  constructor(
    public readonly transactionExternalId: string,
    public readonly transactionStatus: string,
    public readonly amount: number,
  ) {}

  toString() {
    return JSON.stringify({
      transactionExternalId: this.transactionExternalId,
      transactionStatus: this.transactionStatus,
      amount: this.amount,
    });
  }
}
