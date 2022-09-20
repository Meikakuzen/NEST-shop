import { ParseUUIDPipe } from "@nestjs/common";
import { ReplaySubject } from "rxjs";
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @Column('text',{
        unique: true
    })
    title: string

    @Column('float',{
        default:0
    })
    price: number

    @Column({
        type: 'text',
        nullable: true
    })
    description: string

    @Column({
        type: 'text',
        unique: true
    })
    slug: string

    @Column('int', {
        default: 0
    })
    stock: number

    @Column('text',{
        array: true
    })
    sizes: string[]

    @Column('text')
    gender: string

    @Column({
        type: 'text',
        array: true,
        default: []
    })
    tags: string[]

    @BeforeInsert()
    checkSlugInsert(){
        if ( !this.slug){
            this.slug= this.title     
        }
        this.slug= this.slug
            .toLowerCase()
            .replace(' ','_')
            .replace("'", '')
    }

    @BeforeUpdate()
    checkSlugUpdate(){
        this.slug= this.slug
            .toLowerCase()
            .replace(' ','_')
            .replace("'", '')

    }
}
