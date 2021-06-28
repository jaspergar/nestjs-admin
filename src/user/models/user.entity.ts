import { Exclude } from "class-transformer";
import { Role } from "src/role/models/role.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({unique: true})
    email: string;

    @Column()
    @Exclude() // Wont return password if we try to retrieve it from the db
    password: string;

    @ManyToOne(() => Role)
    @JoinColumn({name : 'role_id'})
    role: Role;
}