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
    async allUser(@Query('page') page: number): Promise<User[]> {
        return  this.userInterface.paginate(page , 'role');
    }

    @Post()
    async createUser(@Body() body: UserCreateDto): Promise<User> {
        return  this.userInterface.create(body);
    }

    @Get(':id')
    async getUserById(@Param('id') id : number): Promise<User> {
        return this.userInterface.findOneById(id , 'role');
    }

    @Put()
    async updateUser(@Body() body : UserUpdateDto, @Query('id',ParseIntPipe) id : number) : Promise<User> {
        return this.userInterface.update(body,id);
    }

    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id : number) : Promise<User> {
        return this.userInterface.delete(id , 'role');
    }

}
