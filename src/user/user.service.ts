import { BadRequestException, Body, HttpException, HttpStatus, Injectable, NotFoundException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/user.entity';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import {Response , Request} from 'express';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import type { UserServiceInterface } from './interfaces/user-service.interface';
import { AbstractService } from 'src/common/abstract.service';
import { PaginatedResultInterface } from 'src/common/paginated-result.interface';

@Injectable()
export class UserService extends AbstractService implements UserServiceInterface{
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,  
    private jwtService: JwtService
  ) {
    super(userRepository);
  }

  //paginate
  async paginate(page : number = 1 , relation : string) : Promise<PaginatedResultInterface> {
    // calling the function paginate on the parent class which is an abstract class and returning the data and meta
    const {data , meta} = await super.paginate(page , relation)
    return {
      data : data.map(user => {
        //spread the user data , and extract the password.
        //then return the user without the password.
        const {password, ...data} = user;
        return data;
      }) ,
      meta
    }
  }

  //register user
  async register(registerDTO: RegisterDto): Promise<User> {
    try {
      if(registerDTO.password === registerDTO.password_confirm){
        const hashed = await bcrypt.hash(registerDTO.password, 12);
        registerDTO.password = hashed;
  
        const newUser = this.userRepository.create({ ...registerDTO , role : {id : 4} });
        
        return  this.userRepository.save(newUser);
      }else{
       throw new BadRequestException('Password do not match');
      }
    } catch (err) {
        throw new HttpException(err.message , 500);
    }
  }

  //authenticate user
  async loginUser(email, pass , response : Response): Promise<User> {
      try{
        const {password} = pass
        const user = await this.userRepository.findOne(email);
         
        if(!user){
            throw new NotFoundException(`No registered user with the email of ${email.email}`);
        }
        if(!await bcrypt.compare(password , user.password)){
            throw new BadRequestException('Invalid credentials');
        }

        const jwt = await this.jwtService.signAsync({id:user.id});

        response.cookie('jwt', jwt,{httpOnly:true});

        return user;
      }
      catch(err){
         throw new HttpException(err.message , 500);
      }
  }
 
 // Get authenticated user
   async getUser(request : Request) : Promise<User> {
       try{
        const cookie = request.cookies['jwt'];

        //Get the id of the authenticated user
        const data = await this.jwtService.verifyAsync(cookie);
 
        //Find the user with the same id
        const user = this.findOneById(data['id'] , 'role');
 
        return user;
       }
       catch(err){
        throw new HttpException(err.message, 500);
       }
   }

   //Create user
   async create(userCreateDto : UserCreateDto) : Promise<User> {
     try{
      const password = await bcrypt.hash('123456' , 12);

      const {role_id , ...data} = userCreateDto
      
      //adding the hashed password data to the userCreateDto.
      const newUser = this.userRepository.create(
          {
            ...data, 
            password, 
            role : {id : role_id}
          }
        );
          
      return  this.userRepository.save(newUser);
     
     }
     catch(err){
      throw new HttpException("Email already exist." , HttpStatus.NOT_ACCEPTABLE);
     }
   }

   //Update user
  async update( userUpdateDto : UserUpdateDto,id : number ) : Promise<User>{
      try{
          // const user = await this.findOneById(id);

          // user.first_name = userUpdateDto.first_name;
          // user.last_name = userUpdateDto.last_name;
          // user.email = userUpdateDto.email;

          // return this.userRepository.save(user);

          const {role_id , ...data} = userUpdateDto

          await this.userRepository.update(id , {
            ...data,
            role: {id : role_id}
          });
          
          return this.findOneById(id , 'role');
         
      }
      catch(err){
        throw new HttpException(err.message , 500);
      }
   }
}
