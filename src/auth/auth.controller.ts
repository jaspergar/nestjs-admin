import { Body, ClassSerializerInterceptor, Controller, Get, HttpException, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/models/user.entity';
import { RegisterDto } from './dto/register.dto';
import {Response , Request} from 'express'
import { AuthGuard } from './auth.guard';

@UseInterceptors(ClassSerializerInterceptor) //Interceptor to remove excluded entity (Password)
@Controller()
export class AuthController {
   constructor(private userService: UserService){}
   
   @Post('register')
   async register(@Body() body : RegisterDto) : Promise<User> {
       return this.userService.register(body);
   }

   @Post('login')
   async login(
       @Body('email') email: string,
       @Body('password') password: string,
       @Res({passthrough:true}) response : Response //to send httponly cookie
   ) : Promise<User> {
      return await this.userService.loginUser({email} , {password} , response);
   }
   
   // Get authenticated user 
   @UseGuards(AuthGuard)
   @Get('user')
   async user(@Req() request : Request) : Promise<User>{
       return this.userService.getUser(request);
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
