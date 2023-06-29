import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'

@Entity()
@ObjectType()
export class User extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: string

    @Field(() => String)
    @Column()
    firstName: string

    @Field(() => String)
    @Column()
    lastName: string

    @Column()
    age: number

}
