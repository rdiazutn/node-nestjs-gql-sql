import { Salesman, SalesmanInput } from '../models/Salesman.entity'
import { Inject, Injectable } from '@nestjs/common'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { FindOptionsWhere } from 'typeorm'
import { Branch } from '../models/Branch.entity'

@Injectable()
export class SalesmanService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async findAll(): Promise<Salesman[]> {
    return await Salesman.find()
  }

  async findAllBy(criteria: FindOptionsWhere<Salesman>): Promise<Salesman[]> {
    return await Salesman.findBy(criteria)
  }
  async find(id: number): Promise<Salesman> {
    return await Salesman.findOneBy({ id })
  }

  async create(input: SalesmanInput) {
    const branch = await Branch.findOneBy({ id: input.branchId })
    if (!branch) {
      throw new Error('Branch not found')
    }
    const salesman = Salesman.create({ ...input, branch })
    await salesman.save()
    return salesman
  }

  async update(id: number, input: SalesmanInput) {
    const salesman = await Salesman.findOneBy({ id })
    if (!salesman) {
      throw new Error('Salesman not found')
    }
    Object.assign(salesman, input)
    await salesman.save()
    return salesman
  }
}
