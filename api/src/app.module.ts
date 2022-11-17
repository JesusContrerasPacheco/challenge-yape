import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { TransactionsModule } from './transactions.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    TransactionsModule,
  ],
  controllers: [], // [AppController],
  providers: [], // [AppService],
})
export class AppModule {}
