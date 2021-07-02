import { Permission } from "src/permission/models/permission.entity";

export class RoleUpdateDto{
    name?: string;
    permissions?: Permission[];
}