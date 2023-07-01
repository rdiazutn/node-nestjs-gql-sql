import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany } from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'
import { Branch } from './Branch'
import { Sale } from './Sale'

@Entity()
@ObjectType()
export class Salesman extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
      id: string

    @Field(() => String)
    @Column()
      name: string

    @Field(() => Branch)
    @ManyToOne(() => Branch, branch => branch.salesmans)
      branch: Branch

    @OneToMany(() => Sale, sale => sale.salesman)
    @Field(() => [Sale])
      sales: Sale[]

}
