import { Body, ClassSerializerInterceptor, Controller, Get, HttpException, Inject, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { User } from 'src/user/models/user.entity';
import { RegisterDto } from './dto/register.dto';
import {Response , Request} from 'express'
import { AuthGuard } from './auth.guard';
import { UserServiceInterface, USERSERVICE_INTERFACE } from 'src/user/interfaces/user-service.interface';

@UseInterceptors(ClassSerializerInterceptor) //Interceptor to remove excluded entity (Password)
@Controller()
export class AuthController {
   constructor(@Inject(USERSERVICE_INTERFACE) private userServiceInterface: UserServiceInterface){}
   
   @Post('register')
   async register(@Body() body : RegisterDto) : Promise<User> {
       return this.userServiceInterface.register(body);
   }

   @Post('login')
   async login(
       @Body('email') email: string,
       @Body('password') password: string,
       @Res({passthrough:true}) response : Response //to send httponly cookie
   ) : Promise<User> {
      return await this.userServiceInterface.loginUser({email} , {password} , response);
   }
   
   // Get authenticated user 
   @UseGuards(AuthGuard)
   @Get('user')
   async user(@Req() request : Request) : Promise<User>{
       return this.userServiceInterface.getAuthUser(request);
   }

   @UseGuards(AuthGuard) // Restrict access to the routes
   @Post('logout')
   async logout(@Res({passthrough:true}) response : Response) : Promise<Object>{
       try{
            response.clearCookie('jwt');
            return {
                message : 'Logout Successfully'
            }
       }
       catch(err){
         throw new HttpException(err.message , 500);
       }
   }
} 
