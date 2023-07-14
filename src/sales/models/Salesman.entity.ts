import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm'
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql'
import { Branch } from './Branch.entity'
import { Sale } from './Sale.entity'

@Entity()
@ObjectType()
export class Salesman extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => String)
  @Column()
  name: string

  @Field(() => Branch)
  @ManyToOne(() => Branch, (branch) => branch.salesmans, { nullable: false })
  @JoinColumn({ name: 'branchId' })
  branch: Branch

  @Field(() => Number)
  @Column()
  branchId: number

  @OneToMany(() => Sale, (sale) => sale.salesman)
  @Field(() => [Sale])
  sales: Sale[]
  // TODO
  // @OneToOne(() => User, (user) => user.salesman)
  // @Field(() => User)
  // user: User;
}

@InputType()
export class SalesmanInput {
  @Field(() => String)
  name: string

  @Field(() => Number)
  branchId: number
}
