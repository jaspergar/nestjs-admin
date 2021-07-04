import { Response , Request} from "express";
import { RegisterDto } from "src/auth/dto/register.dto";
import { PaginatedResultInterface } from "src/common/paginated-result.interface";
import { UserCreateDto } from "../dto/user-create.dto";
import { UserUpdateDto } from "../dto/user-update.dto";
import { User } from "../models/user.entity";

// creating a constant
// Since JavaScript doesn’t support/understand interfaces, 
// when we compile down our TypeScript to JavaScript our interfaces no longer exist.
// To use dependency injection with interfaces we need to create a token to associate with an interface
// and provide that token when injecting to an interface type.
export const USERSERVICE_INTERFACE = 'USER SERVICE INTERFACE';

export interface UserServiceInterface {
  all(relation : string) : Promise<User[]>;
  paginate(page : number , relation : string) : Promise<any>;
  findOneById(id : number , relation : string): Promise<User>;
  register(registerDTO: RegisterDto): Promise<User>;
  loginUser(email, pass , response : Response): Promise<User>;
  getUser(request : Request) : Promise<User> ;
  create(userCreateDto : UserCreateDto) : Promise<User>;
  update(data : UserUpdateDto,id : number) : Promise<User>;
  delete(id : number , relation : string) : Promise<User>;
}