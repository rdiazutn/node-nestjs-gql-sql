import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Branch } from './Branch.entity';
import { Sale } from './Sale.entity';

@Entity()
@ObjectType()
export class Salesman extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => Branch)
  @ManyToOne(() => Branch, (branch) => branch.salesmans)
  branch: Branch;

  @OneToMany(() => Sale, (sale) => sale.salesman)
  @Field(() => [Sale])
  sales: Sale[];
  // TODO
  // @OneToOne(() => User, (user) => user.salesman)
  // @Field(() => User)
  // user: User;
}
