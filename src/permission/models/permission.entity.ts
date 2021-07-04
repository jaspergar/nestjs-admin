import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class Permission {
    @PrimaryGeneratedColumn()
    id : number;
    @Column({unique: true})
    name : string;
}