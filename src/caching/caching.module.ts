import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';

const cacheModule = CacheModule.register();
@Global() // Mark the module as global to make it available across the application
@Module({
  imports: [cacheModule],
  exports: [cacheModule],
})
export class CachingModule {}
