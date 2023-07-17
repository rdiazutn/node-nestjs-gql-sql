import {
  Args,
  Context,
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
import { BranchPage, PaginationArgs } from '../utils/PaginationArgs'
import { SalesModuleContext } from '../loaders/overrides/SalesModuleContext'

@Resolver(() => Branch)
export class BranchResolver {
  constructor(
    @Inject(BranchService) private branchService: BranchService,
    @Inject(SalesmanService) private salesmanService: SalesmanService,
  ) {}

  @ResolveField(() => [Salesman], {
    name: 'salesmans',
    nullable: 'itemsAndList',
    // Check ComplexityPlugin.ts
    complexity: 10,
  })
  getSalesmans(
    @Parent() branch: Branch,
    @Context() context: SalesModuleContext,
  ) {
    console.log('getSalesmans', context)
    return this.salesmanService.findAllByBranchId(
      branch.id,
      context.salesmanLoader,
    )
  }

  @UseGuards(AuthorizeGuard)
  @Query(() => BranchPage)
  branches(@Args() paginationArgs: PaginationArgs) {
    return this.branchService.findAll(paginationArgs)
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
