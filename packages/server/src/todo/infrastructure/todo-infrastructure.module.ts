import { DynamicModule, Module } from '@nestjs/common';

import { Driver } from '../../common/types/driver';

import { InMemoryPersistenceModule } from './in-memory-persistence/in-memory-persistence.module';
import { OrmPersistenceModule } from './orm-persistence/orm-persistence.module';

@Module({})
export class TodoInfrastructureModule {
  static use(driver: Driver): DynamicModule {
    const persistenceModule = driver === 'orm' ? OrmPersistenceModule : InMemoryPersistenceModule;

    return {
      module: TodoInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
