import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { RoleUpdateDto } from './dto/role-update.dto';
import { RoleDto } from './dto/role.dto';
import { RoleServiceInterface, ROLESERVICE_INTERFACE } from './interfaces/role-service.interface';
import { Role } from './models/role.entity';

@Controller('roles')
export class RoleController {

    constructor(@Inject(ROLESERVICE_INTERFACE) private readonly roleService : RoleServiceInterface){}
    
    @Get()
    async all(@Query('page') page: number) : Promise<Role[]> {
        return this.roleService.paginate(page , 'permissions');
    }

    @Get('/:id')
    async getRoleById(@Param('id') id : number) : Promise<Role>{
        return this.roleService.findOneById(id , 'permissions');
    }

    @Post()
    async createRole(@Body() body : RoleDto , @Body('permissions') permissionIds : number[]) : Promise<Role> {
        return this.roleService.create(body , permissionIds);
    }

    @Put()
    async updateRole(@Query('id' , ParseIntPipe) id : number , @Body() data : RoleUpdateDto , @Body('permissions') permissionIds: number[] ) : Promise<Role> {
        return this.roleService.update(id , data , permissionIds);
    }

    @Delete(':id')
    async deleteRole(@Param('id', ParseIntPipe) id : number) : Promise<Role> {
        return this.roleService.delete(id , 'permissions');
    }
}
