import { PrimaryColumn, Column, Entity } from 'typeorm';

@Entity()
export class Transactions {
  @PrimaryColumn({ name: 'transactionexternalid' })
  transactionExternalId: string;

  @Column({ name: 'transactiontype', type: 'varchar', length: '15' })
  transactionType: string;

  @Column({ name: 'transactionstatus', type: 'varchar', length: '15' })
  transactionStatus: string;

  @Column({ type: 'int' })
  amount: number;

  @Column({ name: 'createdat', type: 'varchar', length: '20' })
  createdAt: string;
}
