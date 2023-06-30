import { ObjectType, Field, ID } from "type-graphql";
import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Product } from "./Product";
import { Sale } from "./Sale";

@Entity()
@ObjectType()
export class SaleDetail extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: string


    @ManyToOne(() => Product, product => product.saleDetails)
    @Field(() => Product)
    product: Product

    @ManyToOne(() => Sale, sale => sale.saleDetails)
    @Field(() => Sale)
    sale: Sale   

}