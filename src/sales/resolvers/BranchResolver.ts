import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Branch, BranchInput } from '../models/Branch.entity';
import { BranchService } from '../services/BranchService';
import { Inject } from '@nestjs/common';

@Resolver()
export class BranchResolver {
  constructor(@Inject(BranchService) private branchService: BranchService) {}

  @Query(() => [Branch])
  branches() {
    return this.branchService.findAll();
  }

  @Mutation(() => Branch)
  createBranch(@Args('input') input: BranchInput) {
    return this.branchService.create(input);
  }
}
