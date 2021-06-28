import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
           return this.roleRepository.findOneOrFail(id);
        }
        catch(err){
            throw new NotFoundException(`No Role found in id ${id}`)
        }
    }

    async createRole(roleDto : RoleDto) : Promise<Role> {
       try{
           const newRole = this.roleRepository.create({...roleDto});

           return this.roleRepository.save(newRole);
       }
       catch(err){
           throw new HttpException(err.message , HttpStatus.REQUEST_TIMEOUT);
       }
    }

    async updateRole(id: number , data : RoleDto) : Promise<Role>{
       try{
           const role = await this.findOneById(id);
           role.name = data.name

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
