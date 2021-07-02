import { Permission } from "src/permission/models/permission.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({unique : true})
    name : string;

    @ManyToMany(() => Permission, {cascade: true})
    @JoinTable({
        name : 'role_permissions',
        joinColumn: {name: 'role_id',referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'permission_id' , referencedColumnName:'id'}
    })
    permissions: Permission[];
}