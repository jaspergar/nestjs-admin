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
import type { UserInterface } from './interfaces/user-service.interface';

@Injectable()
export class UserService implements UserInterface{
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,  
    private jwtService: JwtService
  ) {}

  //get all user
  public async all(): Promise<User[]> {
    return this.userRepository.find();
  }

  //get one user by id
  public async findOneById(id : number): Promise<User>{
    try{
       const user = await  this.userRepository.findOneOrFail(id);
       
        return user;
    }
    catch(err){ 
      throw new NotFoundException(`No user found in id ${id}`)
    }
  }

  //register user
  public async register(registerDTO: RegisterDto): Promise<User> {
    try {
      if(registerDTO.password === registerDTO.password_confirm){
        const hashed = await bcrypt.hash(registerDTO.password, 12);
        registerDTO.password = hashed;
  
        const newUser = this.userRepository.create({ ...registerDTO });
        
        return  this.userRepository.save(newUser);
      }else{
       throw new BadRequestException('Password do not match');
      }
    } catch (err) {
        throw new HttpException(err.message , 500);
    }
  }

  //authenticate user
  public async loginUser(email, pass , response : Response): Promise<User> {
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
   public async getUser(request : Request) : Promise<User> {
       try{
        const cookie = request.cookies['jwt'];

        //Get the id of the authenticated user
        const data = await this.jwtService.verifyAsync(cookie);
 
        //Find the user with the same id
        const user = this.findOneById(data['id']);
 
        return user;
       }
       catch(err){
        throw new HttpException(err.message, 500);
       }
   }

   //Create user
   public async createUser(userCreateDto : UserCreateDto) : Promise<User> {
     try{
      const password = await bcrypt.hash('123456' , 12);
      
      const newUser = this.userRepository.create({ ...userCreateDto, password });
          
      return  this.userRepository.save(newUser);
     
     }
     catch(err){
      throw new HttpException("Email already exist." , HttpStatus.NOT_ACCEPTABLE);
     }
   }

   //Update user
  public async updateUser(id : number , data : UserUpdateDto) : Promise<User>{
      try{
          const user = await this.findOneById(id);

          user.first_name = data.first_name;
          user.last_name = data.last_name;
          user.email = data.email;

          return this.userRepository.save(user);
      }
      catch(err){
        throw new HttpException(err.message , 500);
      }
   }

   //delete user
   public async deleteUser(id : number) : Promise<User>{
     try{
          const user = await this.findOneById(id);

          return this.userRepository.remove(user);
     }
     catch(err){
        throw new HttpException(err.message, HttpStatus.OK);
     }
   }
}
