import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({unique : true})
    name : string;
}