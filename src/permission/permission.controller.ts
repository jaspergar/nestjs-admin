import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { PermissionDto } from './dto/permission.dto';
import { Permission } from './models/permission.entity';
import { PermissionService } from './permission.service';

@Controller('permissions')
export class PermissionController {
    constructor(private permissionService : PermissionService){}

    @Get()
    async all(@Query('page') page: number) : Promise<any>{
        return this.permissionService.paginate(page);
    }

    @Post()
    async createPermission(@Body() body : PermissionDto) : Promise<Permission> {
       return this.permissionService.create(body);
    }

    @Delete(':id')
    async deleteRole(@Param('id', ParseIntPipe) id : number) : Promise<Permission> {
        return this.permissionService.delete(id);
    }
}
