import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { HelloWorldModule } from './hello-world/hello-world.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    playground: false,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    plugins: [
      ApolloServerPluginLandingPageLocalDefault()
      ]
    }),
    HelloWorldModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}