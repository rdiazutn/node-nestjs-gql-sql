import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne } from 'typeorm'
import { ObjectType, Field, ID, InputType } from 'type-graphql'
import { Salesman } from './Salesman'
import { IsNumber, MaxLength, Min, MinLength } from 'class-validator'

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
}


@InputType()
export class BranchInput {
  @MinLength(4, {
    message: 'Code must be at least 4 characters',
  })
  @MaxLength(8, {
    message: 'Code must not be more than 8 characters',
  })
  @Field(() => String)
    code: string
    
  @MinLength(4, {
    message: 'Name must be at least 4 characters',
  })
  @MaxLength(8, {
    message: 'Name must not be more than 8 characters',
  })
  @Field(() => String)
    name: string
}
