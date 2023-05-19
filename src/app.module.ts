import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/user/UserModule';
import { BookModule } from './book/BookModule';
import { ReviewModule } from './review/ReviewModule';
import { CommentModule } from './comment/CommentModule';
import { CategoryModule } from './category/CategoryModule';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './exception.filter';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/services/UserService';
import { AppGateway } from './app/app.gateway';

@Module({
  imports: [
    UserModule,
    BookModule,
    ReviewModule,
    CommentModule,
    CategoryModule,
    AuthModule.forRoot({
      // https://try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
      connectionURI: process.env.CONNECTION_URI,
      apiKey: process.env.API_KEY,
      appInfo: {
        // Learn more about this on https://supertokens.com/docs/emailpassword/appinfo
        appName: 'Nabokovian',
        apiDomain: process.env.URL,
        websiteDomain: process.env.URL,
        apiBasePath: '/api/auth',
        websiteBasePath: '/auth',
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    UserService,
    AppService,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    AppGateway,
  ],
})
export class AppModule {}
