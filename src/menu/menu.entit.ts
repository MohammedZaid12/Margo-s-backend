import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Exclude, Expose } from "class-transformer";



@Entity('menu')
export class Menu {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ length: 25 })
    name:string;
    @Column({ type:'text' , unique:true})
    code:string;
    @Column()
    price:number;
    @Column()
    description:string;
    @Column({ length: 25 })
    parentCode:string;
    @Column()
    isParent:number;
    @Column()
    status:number;

   
}
