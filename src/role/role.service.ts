import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { RoleUpdateDto } from './dto/role-update.dto';
import { RoleDto } from './dto/role.dto';
import { RoleServiceInterface } from './interfaces/role-service.interface';
import { Role } from './models/role.entity';

@Injectable()
export class RoleService extends AbstractService implements RoleServiceInterface{
    constructor(@InjectRepository(Role) private readonly roleRepository : Repository<Role>)
    {
        super(roleRepository)
    }

    async create(roleDto : RoleDto , permissionIds : number[]) : Promise<Role> {
       try{
           /*
             if [1 ,2] is the permission id's
             the map function will return 

             [
                 {id: 1} , {id: 2}
             ]
           */
           const newRole = this.roleRepository.create({
               ...roleDto,
               permissions : permissionIds.map(id => ({id}))
            });

           return this.roleRepository.save(newRole);
       }
       catch(err){
           throw new HttpException(err.message , HttpStatus.REQUEST_TIMEOUT);
       }
    }

    async update(id: number , data : RoleUpdateDto , permissionIds : number[]) : Promise<Role>{
       try{
           const permIds  = [];

           const role = await this.findOneById(id , 'permissions');
           role.name = data.name

           if(permissionIds){

            const pIds = permissionIds.map(id => ({id}));
            permIds.push(...pIds);

            role.permissions = permIds;
           }
           

           return this.roleRepository.save(role);
       }
       catch(err){
           throw new HttpException(err.message , HttpStatus.REQUEST_TIMEOUT);
       }
    }

}
