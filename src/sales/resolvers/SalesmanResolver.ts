import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Inject, UseGuards } from '@nestjs/common'
import { AuthorizeGuard } from 'src/guards/AuthorizeGuard'
import { RolesGuard } from 'src/guards/RolesGuard'
import { Salesman, SalesmanInput } from '../models/Salesman.entity'
import { SalesmanService } from '../services/SalesmanService'

@Resolver(() => Salesman)
export class SalesmanResolver {
  constructor(
    @Inject(SalesmanService) private salesmanService: SalesmanService,
  ) {}

  @UseGuards(AuthorizeGuard)
  @Query(() => [Salesman])
  salesmans() {
    return this.salesmanService.findAll()
  }

  @UseGuards(AuthorizeGuard, new RolesGuard(['ADMIN']))
  @Mutation(() => Salesman)
  createSalesman(@Args('input') input: SalesmanInput) {
    return this.salesmanService.create(input)
  }

  @UseGuards(AuthorizeGuard, new RolesGuard(['ADMIN']))
  @Mutation(() => Salesman)
  updateSalesman(@Args('id') id: number, @Args('input') input: SalesmanInput) {
    return this.salesmanService.update(id, input)
  }
}
