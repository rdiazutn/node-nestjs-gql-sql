import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from './models/User'
import { Salesman } from './models/Salesman'
import { Branch } from './models/Branch'
import { Sale } from './models/Sale'
import { SaleDetail } from './models/SaleDetail'
import { Product } from './models/Product'

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