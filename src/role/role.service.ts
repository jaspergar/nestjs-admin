import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleUpdateDto } from './dto/role-update.dto';
import { RoleDto } from './dto/role.dto';
import { RoleServiceInterface } from './interfaces/role-service.interface';
import { Role } from './models/role.entity';

@Injectable()
export class RoleService implements RoleServiceInterface{
    constructor(@InjectRepository(Role) private readonly roleRepository : Repository<Role>){}

    async all() : Promise<Role[]> {
        try{ 
            return this.roleRepository.find();
        }
        catch(err){
            throw new HttpException(err.message , HttpStatus.REQUEST_TIMEOUT);
        }
    }

    async findOneById(id : number) : Promise<Role> {
        try{
           return this.roleRepository.findOneOrFail(id , {relations : ['permissions']});
        } 
        catch(err){
            throw new NotFoundException(`No Role found in id ${id}`)
        }
    }

    async createRole(roleDto : RoleDto , permissionIds : number[]) : Promise<Role> {
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

    async updateRole(id: number , data : RoleUpdateDto , permissionIds : number[]) : Promise<Role>{
       try{
           let permIds  = [];

           const role = await this.findOneById(id);
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

    async deleteRole(id : number) : Promise<Role> {
        try{
            const role = await this.findOneById(id);
            return this.roleRepository.remove(role);
        }
        catch(err){
            throw new HttpException(err.message , HttpStatus.REQUEST_TIMEOUT);
        }
    }
}
