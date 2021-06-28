import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ROLESERVICE_INTERFACE } from './interfaces/role-service.interface';
import { Role } from './models/role.entity';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Role]),
  ],
  controllers: [RoleController],
  providers: [
    {
      provide : ROLESERVICE_INTERFACE , 
      useClass : RoleService
    }
  ]
})
export class RoleModule {}
