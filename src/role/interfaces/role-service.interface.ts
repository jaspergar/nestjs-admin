import { RoleDto } from "../dto/role.dto";
import { Role } from "../models/role.entity";


export const ROLESERVICE_INTERFACE = 'ROLE SERVICE INTERFACE';

export interface RoleServiceInterface {

    all() : Promise<Role[]> ;

    findOneById(id : number) : Promise<Role> ;

    createRole(roleDto : RoleDto) : Promise<Role> ;

    updateRole(id: number , data : RoleDto) : Promise<Role> ;

    deleteRole(id : number) : Promise<Role> ;
}