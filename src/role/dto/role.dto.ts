import { IsNotEmpty } from "class-validator";
import { Permission } from "src/permission/models/permission.entity";

export class RoleDto {
    @IsNotEmpty()
    name : string;
    @IsNotEmpty()
    permissions : Permission[];
}