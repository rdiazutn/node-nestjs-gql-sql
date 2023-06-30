import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'
import { Branch } from './Branch'

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

}
