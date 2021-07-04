import { PaginatedResultInterface } from "src/common/paginated-result.interface";
import { RoleUpdateDto } from "../dto/role-update.dto";
import { RoleDto } from "../dto/role.dto";
import { Role } from "../models/role.entity";


export const ROLESERVICE_INTERFACE = 'ROLE SERVICE INTERFACE';

export interface RoleServiceInterface {

    all() : Promise<Role[]> ;

    paginate(page : number , relation : string) : Promise<any>;

    findOneById(id : number , relation : string) : Promise<Role> ;

    create(roleDto : RoleDto , permissionIds : number[]) : Promise<Role> ;

    update(id: number , data : RoleUpdateDto , permissionIds : number[]) : Promise<Role> ;

    delete(id : number , relation : string) : Promise<Role> ;
}