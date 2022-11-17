import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';
import { TypeOrmModule } from '@nestjs/typeorm';
//import config from './../config';
//import { ConfigType } from '@nestjs/config';
import { Transactions } from '../entities/transactions.entity';

const client = new Client({
  user: 'postgres',
  password: 'postgres',
  database: 'yape',
  host: 'localhost',
  port: 5432,
});

client.connect();

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'postgres',
          database: 'yape',
          entities: [Transactions],
        };
      },
    }),
    TypeOrmModule.forFeature([Transactions]),
  ],
  providers: [
    {
      provide: 'PG',
      useValue: client,
    },
  ],
  exports: ['PG', TypeOrmModule],
})
export class DatabaseModule {}
