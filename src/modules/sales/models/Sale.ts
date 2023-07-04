import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne } from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'
import { Salesman } from './Salesman'
import { SaleDetail } from './SaleDetail'

@Entity()
@ObjectType()
export class Sale extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
      id: string

    @Field(() => String)
    @Column()
      code: string

    @Field(() => String)
    @Column()
      name: string

    @ManyToOne(() => Salesman, salesman => salesman.sales)
    @Field(() => Salesman)
      salesman: Salesman  
    
    @OneToMany(() => SaleDetail, detail => detail.sale)
    @Field(() => [SaleDetail])
      saleDetails: SaleDetail[]

}
