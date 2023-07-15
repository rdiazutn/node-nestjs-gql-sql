import { Inject, Injectable } from '@nestjs/common'
import { Branch, BranchInput } from '../models/Branch.entity'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { BranchPage, PaginationArgs } from '../utils/PaginationArgs'

@Injectable()
export class BranchService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async findAll(
    paginationArgs: PaginationArgs = { skip: 0, take: 20 },
  ): Promise<BranchPage> {
    const [data, total] = await Branch.findAndCount({
      skip: paginationArgs.skip,
      take: paginationArgs.take,
    })
    return new BranchPage(data, total, paginationArgs.skip, paginationArgs.take)
  }

  async create(input: BranchInput) {
    const branch = Branch.create({ ...input })
    await branch.save()
    return branch
  }

  async update(id: number, input: BranchInput) {
    const branch = await Branch.findOneBy({ id })
    if (!branch) {
      throw new Error('Branch not found')
    }
    Object.assign(branch, input)
    await branch.save()
    return branch
  }
}
