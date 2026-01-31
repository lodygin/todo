import { Todo } from '../../domain/todo';

import { TodoEntity } from './entities/todo.entity';

export class TodoMapper {
  static toDomain(entity: TodoEntity): Todo {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      priority: entity.priority,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      completedAt: entity.completedAt,
    };
  }
}
