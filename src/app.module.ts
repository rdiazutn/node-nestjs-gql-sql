import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SalesModule } from './sales/sales.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { UsersModule } from './users/users.module'
import { Module } from '@nestjs/common'
import { CacheModule } from '@nestjs/cache-manager'
import { CachingModule } from './caching/caching.module'

const cacheModule = CacheModule.register()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: ['dist/**/*.entity{.ts,.js}'],
      logging: true,
      synchronize: true,
    }),
    CachingModule,
    SalesModule,
    UsersModule,
    cacheModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
