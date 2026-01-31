import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApplicationBootstrapOptions } from '../common/types/application-bootstrap';

import { dbConfig } from './db.config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
})
export class CoreModule {
  static forRoot(options: ApplicationBootstrapOptions): DynamicModule {
    const imports =
      options.driver === 'orm'
        ? [ConfigModule.forFeature(dbConfig), TypeOrmModule.forRootAsync(dbConfig.asProvider())]
        : [];

    return {
      module: CoreModule,
      imports,
    };
  }
}
