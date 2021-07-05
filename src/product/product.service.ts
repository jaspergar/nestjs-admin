import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { ProductUpdateDto } from './dto/product-update.dto';
import { ProductServiceInterface } from './interfaces/product-service.interface';
import { Product } from './models/product.entity';

@Injectable()
export class ProductService extends AbstractService implements ProductServiceInterface{
    constructor(@InjectRepository(Product) private readonly productRepository : Repository<Product>)
    {
        super(productRepository)
    }

    async update(productUpdateDto : ProductUpdateDto, id : number) : Promise<Product>{
       try {
           const product = await this.findOneById(id);
           
           product.name = productUpdateDto.name;
           product.description = productUpdateDto.description;
           product.image = productUpdateDto.image;
           product.price = productUpdateDto.price;

           return this.productRepository.save(product)

       } catch (err) {
           throw new HttpException(err.message , HttpStatus.REQUEST_TIMEOUT);
       }
    }
}
