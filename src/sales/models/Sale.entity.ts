import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Salesman } from './Salesman.entity';
import { SaleDetail } from './SaleDetail.entity';

@Entity()
@ObjectType()
export class Sale extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => String)
  @Column()
  code: string;

  @Field(() => String)
  @Column()
  name: string;

  @ManyToOne(() => Salesman, (salesman) => salesman.sales)
  @Field(() => Salesman)
  salesman: Salesman;

  @OneToMany(() => SaleDetail, (detail) => detail.sale)
  @Field(() => [SaleDetail])
  saleDetails: SaleDetail[];
}
