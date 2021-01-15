import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import { IsDate, IsEmail, Length, Matches, Max, Min } from "class-validator";
import { Exclude, Expose } from "class-transformer";



@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 25 })
    name:string;

    @Column({ type:'text' , unique:true})
    @IsEmail()
    email:string;

    @Column()
    @Exclude()
    password:string;
    @Column()
    phoneNumber:string;

    @Column({ length: 25 })
    userType:string;
    
    @Column()
    status:number;


   
}
