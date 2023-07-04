import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from './modules/users/models/User'
import { Salesman } from './modules/sales/models/Salesman'
import { Branch } from './modules/sales/models/Branch'
import { Sale } from './modules/sales/models/Sale'
import { SaleDetail } from './modules/sales/models/SaleDetail'
import { Product } from './modules/sales/models/Product'
export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'src/data/db.sqlite3',
  synchronize: true,
  logging: false,
  entities: [
    User,
    Salesman,
    Branch,
    Sale,
    SaleDetail,
    Product
  ],
  migrations: [],
  subscribers: [],
})

// TODO: autoimport from models