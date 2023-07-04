import { Arg, Authorized, FieldResolver, Mutation, Query, Resolver, ResolverInterface, Root } from 'type-graphql'
import { Salesman } from '../models/Salesman'
import { Branch, BranchInput } from '../models/Branch'
import BranchService from '../services/BranchService'


@Resolver(_of => Branch)
export default class BranchResolver implements ResolverInterface<Branch> {

  constructor(private branchService: BranchService) {
    this.branchService = new BranchService()
  }

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
    return this.branchService.getBranches()
  }


  @Authorized('ADMIN')
  @Mutation(() => Branch) // Returns the JWT
  async createBranch(@Arg('input') input: BranchInput) {
    return this.branchService.create(input)
  }
}
