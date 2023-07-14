import { Salesman, SalesmanInput } from '../models/Salesman.entity'
import { Inject, Injectable } from '@nestjs/common'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { In } from 'typeorm'
import { Branch } from '../models/Branch.entity'
import * as DataLoader from 'dataloader'

function createSalesmanLoader() {
  return new DataLoader<number, Salesman[]>(async (branchIds: number[]) => {
    const salesmans = await Salesman.findBy({
      branch: { id: In(branchIds) },
    })

    // For performance reasons, we want to return an array of salesmans for each branchId
    const salesmansByBranchIds = salesmans.reduce((acc, salesman) => {
      if (!acc[salesman.branchId]) {
        acc[salesman.branchId] = []
      }
      acc[salesman.branchId].push(salesman)
      return acc
    }, {})

    // We need to map ids in order to fill the array with null values because this matches by position
    const salesmanLoaderMap = branchIds.map((id) => salesmansByBranchIds[id])
    return salesmanLoaderMap
  })
}
@Injectable()
export class SalesmanService {
  private salesmanLoader: DataLoader<number, Salesman[]>

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    this.salesmanLoader = createSalesmanLoader()
  }

  async findAllByBranchId(branchId: number): Promise<Salesman[]> {
    return await this.salesmanLoader.load(branchId)
  }

  async findAll(): Promise<Salesman[]> {
    return await Salesman.find()
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
