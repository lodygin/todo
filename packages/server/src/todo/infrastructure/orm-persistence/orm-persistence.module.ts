import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TodoRepository } from '../../application/todo.repository';

import { TodoEntity } from './entities/todo.entity';
import { OrmTodoRepository } from './todo.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  providers: [{ provide: TodoRepository, useClass: OrmTodoRepository }],
  exports: [TodoRepository],
})
export class OrmPersistenceModule {}
