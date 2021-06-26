import { BadRequestException, Body, HttpException, Injectable, NotFoundException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/user.entity';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import {Response , Request} from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,  
    private jwtService: JwtService
  ) {}

  //get all user
  async all(): Promise<User[]> {
    return this.userRepository.find();
  }

  //get one user
  async findOneById(id : number): Promise<User>{
    try{
       const user = await  this.userRepository.findOneOrFail(id);

       return user;
    }
    catch(err){ 
       throw err;
    }
  }

  //register user
  async register(registerDTO: RegisterDto): Promise<User> {
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
        const user = this.findOneById(data['id']);
 
        return user;
       }
       catch(err){
        throw new HttpException(err.message, 500);
       }
   }
}
