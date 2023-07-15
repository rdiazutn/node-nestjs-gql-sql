import { In } from 'typeorm'
import * as DataLoader from 'dataloader'
import { Salesman } from '../models/Salesman.entity'

export function createSalesmanLoader() {
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
