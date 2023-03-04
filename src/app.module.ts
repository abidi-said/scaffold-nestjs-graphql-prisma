import { Module } from '@nestjs/common';
import { TweetsModule } from './modules/tweets/tweets.module';
import { ApiModule } from './api/api.module';
import { PrismaModule } from './database/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import GraphQLJSON from 'graphql-type-json';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
      subscriptions: {
        'graphql-ws': true,
      },
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
      resolvers: { JSON: GraphQLJSON },
    }),
    ApiModule,
    TweetsModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
