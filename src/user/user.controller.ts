import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserServiceInterface, USERSERVICE_INTERFACE } from './interfaces/user-service.interface';
import type { User } from './models/user.entity';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
    constructor(@Inject(USERSERVICE_INTERFACE) private readonly userInterface : UserServiceInterface){}
 
    @Get()
    async all(@Query('page') page: number): Promise<User[]> {
        return  this.userInterface.paginate(page);
    }

    @Post()
    async create(@Body() body: UserCreateDto): Promise<User> {
        return  this.userInterface.createUser(body);
    }

    @Get(':id')
    async get(@Param('id') id : number): Promise<User> {
        return this.userInterface.findOneById(id);
    }

    @Put()
    async update(@Body() body : UserUpdateDto , @Query('id',ParseIntPipe) id : number) : Promise<User> {
        return this.userInterface.updateUser(id,body);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id : number) : Promise<User> {
        return this.userInterface.deleteUser(id);
    }

}
