import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SaleDetail } from './SaleDetail.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Product extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => String)
  @Column()
  code: string;

  @Field(() => String)
  @Column()
  name: string;

  @OneToMany(() => SaleDetail, (detail) => detail.product)
  @Field(() => [SaleDetail])
  saleDetails: SaleDetail[];
}
