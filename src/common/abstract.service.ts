import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PaginatedResultInterface } from './paginated-result.interface';

@Injectable()
export abstract class AbstractService {

    protected constructor(
        protected readonly repository : Repository<any>
    ){}
     //get all data
  async all(relation?: string): Promise<any[]> {
    try{
      return this.repository.find({relations : [relation]});
    }
    catch(err){
      throw new HttpException(err.message , HttpStatus.REQUEST_TIMEOUT);
    }
  }

  //paginate all data
  async paginate(page : number = 1 , relation?: string) : Promise<PaginatedResultInterface> {
    const take = 2;

    const condition = {
      take,
      skip: (page - 1) * take
    }

    //add new property relations to object condition if relation is not null
    if(relation){
      condition["relations"] = [relation];
    }

    const [data, total] = await this.repository.findAndCount({
      ...condition
    });

    return {
      data : data,
      meta : {
        total,
        page,
        last_page: Math.ceil(total / take)
      }
    }
  }

  //get one data by id
  async findOneById(id : number , relation?: string): Promise<any>{
    try{
       const data = await this.repository.findOneOrFail(id , {relations : [relation]});
       
        return data;
    }
    catch(err){ 
      throw new NotFoundException(`No user found in id ${id}`)
    }
  }

  //create data 
  async create(data , condition?: any) : Promise<any>{
    try {
      const newData = this.repository.create({
        ...data
      })

      return this.repository.save(newData);
      
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.OK);
    }
  }
    

  //delete data
  async delete(id : number , relation?: string) : Promise<any>{
    try{
         const user = await this.findOneById(id , relation);

         return this.repository.remove(user);
    }
    catch(err){
       throw new HttpException(err.message, HttpStatus.OK);
    }
  }


}
