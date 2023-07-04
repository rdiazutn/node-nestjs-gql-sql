import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Salesman } from './Salesman.entity';

@Entity()
@ObjectType()
export class Branch extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => String)
  @Column()
  code: string;

  @Field(() => String)
  @Column()
  name: string;

  @OneToMany(() => Salesman, (salesman) => salesman.branch)
  @Field(() => [Salesman])
  salesmans: Salesman[];
}

@InputType()
export class BranchInput {
  @Field(() => String)
  code: string;

  @Field(() => String)
  name: string;
}
