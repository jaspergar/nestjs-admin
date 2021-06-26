import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
// import { JwtModule } from '@nestjs/jwt';
// import { jwtConstants } from './constants';

@Module({
  imports: [
    UserModule
  ],
  controllers: [AuthController],
})
export class AuthModule {}
