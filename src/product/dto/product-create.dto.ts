import { IsNotEmpty } from "class-validator";

export class ProductCreateDto {
    @IsNotEmpty()
    name : string;
    @IsNotEmpty()
    description : string;
    @IsNotEmpty()
    image : string;
    @IsNotEmpty()
    price : number;
}