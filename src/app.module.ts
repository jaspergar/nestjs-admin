import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/jwt-common.module';

@Module({
  imports: [UserModule,
  TypeOrmModule.forRoot({
    type : "mysql",
    host : "localhost",
    port : 3306,
    username : "root",
    password : "l4l4k3rs",
    database: 'admin',
    autoLoadEntities: true, // not applicable for production
    synchronize : true, // not applicable for production
   }),
  AuthModule,
  CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
