import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProductCreateDto } from './dto/product-create.dto';
import { ProductUpdateDto } from './dto/product-update.dto';
import { ProductServiceInterface, PRODUCTSERVICE_INTERFACE } from './interfaces/product-service.interface';
import { Product } from './models/product.entity';

@UseGuards(AuthGuard)
@Controller('products')
export class ProductController {
    constructor(@Inject(PRODUCTSERVICE_INTERFACE) private readonly productServiceInterface : ProductServiceInterface){}

    @Get()
    async getAllProduct(@Query('page') page : number) : Promise<Product[]>{
        return this.productServiceInterface.paginate(page);
    }

    @Get(':id')
    async getOneProductById(@Param('id', ParseIntPipe) id : number) : Promise<Product>{
        return this.productServiceInterface.findOneById(id);
    }

    @Post() 
    async createProduct(@Body() product : ProductCreateDto) : Promise<Product> {
        return this.productServiceInterface.create(product);
    }

    @Put()
    async updateProduct(@Body() product : ProductUpdateDto , @Query('id' ,ParseIntPipe) id : number) : Promise<Product> {
        return this.productServiceInterface.update(product, id)
    }

    @Delete(':id')
    async deleteProduct(@Param('id', ParseIntPipe) id : number) : Promise<Product> {
        return this.productServiceInterface.delete(id);
    }
}

