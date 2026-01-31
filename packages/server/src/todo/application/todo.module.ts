import { DynamicModule, Module, Type } from '@nestjs/common';

import { TodoController } from '../ui/todo.controller';

import { TodoService } from './todo.service';

@Module({
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {
  static withInfrastructure(infrastructureModule: Type | DynamicModule): DynamicModule {
    return {
      module: TodoModule,
      imports: [infrastructureModule],
    };
  }
}
