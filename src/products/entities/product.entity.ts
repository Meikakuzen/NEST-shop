import { ParseUUIDPipe } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/auth/entities/auth.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./product-image.entity";


@Entity({ name: 'products'})
export class Product {

    @ApiProperty({
        example: 'cd54663-4344-665-ad34-57s8',
        description: 'Product ID',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @ApiProperty()
    @Column('text',{
        unique: true
    })
    title: string

    @ApiProperty()
    @Column('float',{
        default:0
    })
    price: number

    @ApiProperty()
    @Column({
        type: 'text',
        nullable: true
    })
    description: string

    @ApiProperty()
    @Column({
        type: 'text',
        unique: true
    })
    slug: string

    @ApiProperty()
    @Column('int', {
        default: 0
    })
    stock: number

    @ApiProperty()
    @Column('text',{
        array: true
    })
    sizes: string[]

    @ApiProperty()
    @Column('text')
    gender: string

    @ApiProperty()
    @Column({
        type: 'text',
        array: true,
        default: []
    })
    tags: string[]

    @OneToMany(
        ()=> ProductImage,
        productImage => productImage.product,
        {cascade: true, eager: true}
    )
    images?: ProductImage[]

    @ManyToOne(
        ()=> User,
        (user)=> user.product,
        {eager: true}

    )
    user: User

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
