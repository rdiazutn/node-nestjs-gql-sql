import { Branch, BranchInput } from '../models/Branch'

export default class BranchService {

  getBranches () {
    return Branch.find()
  }

  async create(input: BranchInput) { 
    const branch = Branch.create({...input})
    await branch.save()
    return branch
  }
}