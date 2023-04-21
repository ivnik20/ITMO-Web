import { Module } from '@nestjs/common';
import { UserController } from './controllers/UserController';
import { UserService } from './services/UserService';

@Module({
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
