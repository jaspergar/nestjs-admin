import { ProductCreateDto } from "../dto/product-create.dto";
import { ProductUpdateDto } from "../dto/product-update.dto";
import { Product } from "../models/product.entity";

export const PRODUCTSERVICE_INTERFACE = 'PRODUCT SERVICE INTERFACE';

export interface ProductServiceInterface {
    all(relation?: string): Promise<Product[]>;
    paginate(page : number, relation?: string) : Promise<any>;
    findOneById(id : number , relation?: string): Promise<Product>;
    create(productCreateDto : ProductCreateDto , condition?: any) : Promise<Product>;
    update(productUpdateDto : ProductUpdateDto,id : number) : Promise<Product>;
    delete(id : number , relation?: string) : Promise<Product>;
}