import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { Branch, BranchInput } from '../models/Branch.entity'
import { BranchService } from '../services/BranchService'
import { Inject, UseGuards } from '@nestjs/common'
import { AuthorizeGuard } from 'src/guards/AuthorizeGuard'
import { RolesGuard } from 'src/guards/RolesGuard'
import { Salesman } from '../models/Salesman.entity'
import { SalesmanService } from '../services/SalesmanService'

@Resolver(() => Branch)
export class BranchResolver {
  constructor(
    @Inject(BranchService) private branchService: BranchService,
    @Inject(SalesmanService) private salesmanService: SalesmanService,
  ) {}

  @ResolveField(() => [Salesman], { name: 'salesmans' })
  getSalesmans(@Parent() branch: Branch) {
    console.log('A request')
    return this.salesmanService.findAllBy({ branch: { id: branch.id } })
  }

  @UseGuards(AuthorizeGuard)
  @Query(() => [Branch])
  branches() {
    return this.branchService.findAll()
  }

  @UseGuards(AuthorizeGuard, new RolesGuard(['ADMIN']))
  @Mutation(() => Branch)
  createBranch(@Args('input') input: BranchInput) {
    return this.branchService.create(input)
  }

  @UseGuards(AuthorizeGuard, new RolesGuard(['ADMIN']))
  @Mutation(() => Branch)
  updateBranch(@Args('id') id: number, @Args('input') input: BranchInput) {
    return this.branchService.update(id, input)
  }
}
