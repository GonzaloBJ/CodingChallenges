import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class user
{
    @PrimaryGeneratedColumn()
    userId: number;

    @Column()
    name: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;
}