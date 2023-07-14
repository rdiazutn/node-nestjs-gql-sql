import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Product } from './Product.entity'
import { Sale } from './Sale.entity'

@Entity()
@ObjectType()
export class SaleDetail extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string

  @ManyToOne(() => Product, (product) => product.saleDetails)
  @Field(() => Product)
  product: Product

  @ManyToOne(() => Sale, (sale) => sale.saleDetails)
  @Field(() => Sale)
  sale: Sale
}
