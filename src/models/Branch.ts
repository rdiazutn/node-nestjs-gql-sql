import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne } from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'
import { Salesman } from './Salesman'

@Entity()
@ObjectType()
export class Branch extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
      id: string

    @Field(() => String)
    @Column()
      code: string

    @Field(() => String)
    @Column()
      name: string

    @OneToMany(() => Salesman, salesman => salesman.branch)
    @Field(() => [Salesman])
      salesmans: Salesman[]

    
    @Field(() => Branch)
    @ManyToOne(() => Branch)
      branch: Branch

}
