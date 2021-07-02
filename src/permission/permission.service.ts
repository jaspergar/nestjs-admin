import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './models/permission.entity';

@Injectable()
export class PermissionService {
    constructor(@InjectRepository(Permission) private readonly permissionRepository : Repository<Permission>){}

    async all() : Promise<Permission[]>{
         try{
             return this.permissionRepository.find();
         }
         catch(err){
             throw err
         }
    }
}