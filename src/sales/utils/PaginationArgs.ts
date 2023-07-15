import { Field, Int, ArgsType, ObjectType } from '@nestjs/graphql'
import { Max, Min } from 'class-validator'
import { Branch } from '../models/Branch.entity'
import { Type } from '@nestjs/common'

@ArgsType()
export class PaginationArgs {
  @Field(() => Int)
  @Min(0)
  skip = 0

  @Field(() => Int)
  @Min(1)
  @Max(50)
  take = 20
}

function Paginated<T>(classRef: Type<T>): any {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(() => [classRef])
    data: T[]

    @Field(() => Int)
    total: number

    @Field(() => Int)
    skip: number

    @Field(() => Int)
    take: number

    constructor(data: T[], total: number, skip: number, take: number) {
      this.data = data
      this.total = total
      this.skip = skip
      this.take = take
    }
  }
  return PaginatedType
}

@ObjectType()
export class BranchPage extends Paginated(Branch) {
  constructor(data: Branch[], total: number, skip: number, take: number) {
    super(data, total, skip, take)
  }
}
// export class BranchPage {
//   @Field(() => [Branch])
//   data: Branch[]

//   @Field(() => Int)
//   total: number

//   @Field(() => Int)
//   skip: number

//   @Field(() => Int)
//   take: number

//   constructor(data: Branch[], total: number, skip: number, take: number) {
//     this.data = data
//     this.total = total
//     this.skip = skip
//     this.take = take
//   }
// }
