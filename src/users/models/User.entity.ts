import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
} from 'typeorm';
import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
// import { Salesman } from '../../sales/models/Salesman'

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => String)
  @Column()
  username: string;

  @Field(() => String)
  @Column({ default: 'USER' })
  role: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  token: string;

  // @OneToOne(() => Salesman, salesman => salesman.user)
  // @Field(() => Salesman)
  //   salesman: Salesman

  @BeforeInsert()
  async beforeInsert() {
    const salt = await bcrypt.genSalt(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }

  toString() {
    delete this.password;
    delete this.token;
    return JSON.stringify(this);
  }
}

@InputType()
export class LoginInput {
  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;
}
