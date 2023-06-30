import { Arg, FieldResolver, Query, Resolver, ResolverInterface, Root } from "type-graphql";
import { Branch } from "../models/Branch";
import { Salesman } from "../models/Salesman";


@Resolver(of => Branch)
export default class BranchResolver implements ResolverInterface<Branch> {

  @FieldResolver()
  async salesmans(@Root() branch: Branch, @Arg('id', { nullable: true }) id: string) {
    const items = await Salesman.find({
      where: {
        branch: {
          id: branch.id
        },
        ...(id && { id })
      }
    })
    console.log(items)
    return items
  }

  @Query(() => [Branch])
  branchs() {
    return Branch.find()
  }
}