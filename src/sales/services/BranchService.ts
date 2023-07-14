import { Inject, Injectable } from '@nestjs/common'
import { Branch, BranchInput } from '../models/Branch.entity'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'

@Injectable()
export class BranchService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async findAll(): Promise<Branch[]> {
    return await Branch.find()
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
