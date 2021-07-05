import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/jwt-common.module';
import { PRODUCTSERVICE_INTERFACE } from './interfaces/product-service.interface';
import { Product } from './models/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports : [
    TypeOrmModule.forFeature([Product]),
    CommonModule
  ],
  controllers: [ProductController],
  providers: [
    {
      provide : PRODUCTSERVICE_INTERFACE , 
      useClass : ProductService
    }
  ]
})
export class ProductModule {}
