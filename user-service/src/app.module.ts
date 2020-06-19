import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { AuthModule } from './resolvers/auth/auth.module';
import { UserModule } from './resolvers/user/user.module';
import { PostModule } from './resolvers/post/post.module';
import { AppResolver } from './resolvers/app.resolver';
import { DateScalar } from './common/scalars/date.scalar';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        autoSchemaFile: configService.get('GRAPHQL_SCHEMA_DEST') || './src/schema.graphql',
        debug: configService.get('GRAPHQL_DEBUG') === '1' ? true : false,
        playground: configService.get('PLAYGROUND_ENABLE') === '1' ? true : false,
        context: ({ req }) => ({ req })
      }),
      inject: [ConfigService]
    }),
    AuthModule,
    UserModule,
    PostModule
  ],
  providers: [AppResolver, DateScalar]
})
export class AppModule {}
