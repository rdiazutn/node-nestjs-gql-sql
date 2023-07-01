import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert } from 'typeorm'
import { ObjectType, Field, ID, InputType } from 'type-graphql'
import bcrypt from 'bcrypt'

@Entity()
@ObjectType()
export class User extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: string

    @Field(() => String)
    @Column()
    username: string

    @Column()
    password: string

    @BeforeInsert()
    async beforeInsert() {
        const salt = await bcrypt.genSalt(10)
        this.password = bcrypt.hashSync(this.password, salt)
    }

    toString () {
        return JSON.stringify(this)
    }
}

@InputType()
export class LoginInput {
  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;
}