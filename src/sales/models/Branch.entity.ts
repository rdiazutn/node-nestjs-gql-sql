import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm'
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql'
import { Salesman } from './Salesman.entity'

@Entity()
@ObjectType()
export class Branch extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => String)
  @Column({ unique: true, nullable: false })
  code: string

  @Field(() => String)
  @Column({ nullable: false })
  name: string

  @OneToMany(() => Salesman, (salesman) => salesman.branch)
  @Field(() => [Salesman], { nullable: 'itemsAndList' })
  salesmans: Salesman[]
}

@InputType()
export class BranchInput {
  @Field(() => String)
  code: string

  @Field(() => String, { nullable: true })
  name: string
}
