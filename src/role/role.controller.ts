import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { RoleUpdateDto } from './dto/role-update.dto';
import { RoleDto } from './dto/role.dto';
import { RoleServiceInterface, ROLESERVICE_INTERFACE } from './interfaces/role-service.interface';
import { Role } from './models/role.entity';

@Controller('roles')
export class RoleController {

    constructor(@Inject(ROLESERVICE_INTERFACE) private readonly roleServiceInterface : RoleServiceInterface){}
    
    @Get()
    async all(@Query('page') page: number) : Promise<Role[]> {
        return this.roleServiceInterface.paginate(page , 'permissions');
    }

    @Get('/:id')
    async getRoleById(@Param('id') id : number) : Promise<Role>{
        return this.roleServiceInterface.findOneById(id , 'permissions');
    }

    @Post()
    async createRole(@Body() body : RoleDto , @Body('permissions') permissionIds : number[]) : Promise<Role> {
        return this.roleServiceInterface.create(body , permissionIds);
    }

    @Put()
    async updateRole(@Query('id' , ParseIntPipe) id : number , @Body() data : RoleUpdateDto , @Body('permissions') permissionIds: number[] ) : Promise<Role> {
        return this.roleServiceInterface.update(id , data , permissionIds);
    }

    @Delete(':id')
    async deleteRole(@Param('id', ParseIntPipe) id : number) : Promise<Role> {
        return this.roleServiceInterface.delete(id , 'permissions');
    }
}
