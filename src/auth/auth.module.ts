import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CommonModule } from 'src/common/jwt-common.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UserModule,
    CommonModule // JwtModule
  ],
  controllers: [AuthController],
})
export class AuthModule {}
