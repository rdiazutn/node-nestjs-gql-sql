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

    @Field(() => String)
    @Column({ default: 'USER' })
    role: string

    @Column()
    password: string

    @Column({ nullable: true })
    token: string

    @BeforeInsert()
    async beforeInsert() {
        const salt = await bcrypt.genSalt(10)
        this.password = bcrypt.hashSync(this.password, salt)
    }

    toString () {
        delete this.password
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