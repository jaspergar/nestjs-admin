import { IsNotEmpty } from "class-validator";

export class PermissionDto {
    @IsNotEmpty()
    name: string
}