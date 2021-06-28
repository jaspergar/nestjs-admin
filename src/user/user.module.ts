import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/jwt-common.module';
import { USERSERVICE_INTERFACE } from './interfaces/user-service.interface';
import { User } from './models/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    CommonModule, // JwtModule
  ],
  controllers: [UserController],
  providers: [
    {
      provide : USERSERVICE_INTERFACE,
      useClass: UserService
    }
  ],
  exports:[USERSERVICE_INTERFACE ]
})
export class UserModule {}
