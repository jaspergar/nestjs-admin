import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { RoleUpdateDto } from './dto/role-update.dto';
import { RoleDto } from './dto/role.dto';
import { RoleServiceInterface, ROLESERVICE_INTERFACE } from './interfaces/role-service.interface';
import { Role } from './models/role.entity';

@Controller('roles')
export class RoleController {

    constructor(@Inject(ROLESERVICE_INTERFACE) private readonly roleService : RoleServiceInterface){}
    
    @Get()
    async all() : Promise<Role[]> {
        return this.roleService.all();
    }

    @Get('/:id')
    async get(@Param('id') id : number) : Promise<Role>{
        return this.roleService.findOneById(id);
    }

    @Post()
    async create(@Body() body : RoleDto , @Body('permissions') permissionIds : number[]) : Promise<Role> {
        return this.roleService.createRole(body , permissionIds);
    }

    @Put()
    async update(@Query('id' , ParseIntPipe) id : number , @Body() data : RoleUpdateDto , @Body('permissions') permissionIds: number[] ) : Promise<Role> {
        return this.roleService.updateRole(id , data , permissionIds);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id : number) : Promise<Role> {
        return this.roleService.deleteRole(id);
    }
}
