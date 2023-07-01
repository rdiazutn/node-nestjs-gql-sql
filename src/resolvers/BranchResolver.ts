import { Arg, FieldResolver, Query, Resolver, ResolverInterface, Root } from "type-graphql";
import { Branch } from "../models/Branch";
import { Salesman } from "../models/Salesman";


@Resolver(_of => Branch)
export default class BranchResolver implements ResolverInterface<Branch> {

  // TODO: Query to filter subattribute salesmans by id
  @FieldResolver()
  salesmans(@Root() branch: Branch, @Arg('id', { nullable: true }) id: string) {
    return Salesman.find({
      where: {
        branch: {
          id: branch.id
        },
        ...(id && { id })
      }
    })
  }

  @Query(() => [Branch])
  branchs() {
    return Branch.find()
  }
}