import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserServiceInterface, USERSERVICE_INTERFACE } from './interfaces/user-service.interface';
import type { User } from './models/user.entity';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
    constructor(@Inject(USERSERVICE_INTERFACE) private readonly userServiceInterface : UserServiceInterface){}
 
    @Get()
    async allUser(@Query('page') page: number): Promise<User[]> {
        return  this.userServiceInterface.paginate(page , 'role');
    }

    @Put('info')
    async updateAuthUserInfo(@Body() body: UserUpdateDto,@Req() request : Request): Promise<User>{
       return this.userServiceInterface.updateAuthenticatedUserInfo(body,request);
    }

    @Put('password')
    async updateAuthUserPassword(
        @Body('password') password : string ,
        @Body('password_confirm') password_confirm : string,
        @Req() request : Request
    ) : Promise<User> {
        return this.userServiceInterface.updateAuthenticatedUserPassword(password,password_confirm,request);
    }

    @Post()
    async createUser(@Body() body: UserCreateDto): Promise<User> {
        return  this.userServiceInterface.create(body);
    }

    @Get(':id')
    async getUserById(@Param('id') id : number): Promise<User> {
        return this.userServiceInterface.findOneById(id , 'role');
    }

    @Put()
    async updateUser(@Body() body : UserUpdateDto, @Query('id',ParseIntPipe) id : number) : Promise<User> {
        return this.userServiceInterface.update(body,id);
    }

    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id : number) : Promise<User> {
        return this.userServiceInterface.delete(id , 'role');
    }

}
