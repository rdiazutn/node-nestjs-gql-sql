import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Branch, BranchInput } from '../models/Branch.entity';
import { BranchService } from '../services/BranchService';
import { Inject, UseGuards } from '@nestjs/common';
import { AuthorizeGuard } from 'src/guards/AuthorizeGuard';

@Resolver()
export class BranchResolver {
  constructor(@Inject(BranchService) private branchService: BranchService) {}

  @UseGuards(AuthorizeGuard)
  @Query(() => [Branch])
  branches() {
    return this.branchService.findAll();
  }

  @UseGuards(AuthorizeGuard)
  @Mutation(() => Branch)
  createBranch(@Args('input') input: BranchInput) {
    return this.branchService.create(input);
  }
}
