import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from './models/User'
import { Salesman } from './models/Salesman'
import { Branch } from './models/Branch'

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'src/data/db.sqlite3',
    synchronize: true,
    logging: false,
    entities: [User, Salesman, Branch],
    migrations: [],
    subscribers: [],
})
// TODO: autoimport from models