import { Injectable } from '@nestjs/common';
import { Branch, BranchInput } from '../models/Branch.entity';

@Injectable()
export class BranchService {
  async findAll(): Promise<Branch[]> {
    return await Branch.find();
  }

  async create(input: BranchInput) {
    const branch = Branch.create({ ...input });
    await branch.save();
    return branch;
  }
}
