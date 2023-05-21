import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService, } from './services/index';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
