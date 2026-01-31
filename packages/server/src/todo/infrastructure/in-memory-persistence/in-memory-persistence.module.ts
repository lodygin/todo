import { Module } from '@nestjs/common';

import { TodoRepository } from '../../application/todo.repository';

import { InMemoryTodoRepository } from './todo.repository';

@Module({
  providers: [{ provide: TodoRepository, useClass: InMemoryTodoRepository }],
  exports: [TodoRepository],
})
export class InMemoryPersistenceModule {}
