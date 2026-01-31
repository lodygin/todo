import assert from 'node:assert';

import { Injectable } from '@nestjs/common';

import { TodoRepository } from '../../application/todo.repository';
import { NewTodo } from '../../domain/new-todo';
import { Todo } from '../../domain/todo';
import { UpdateTodo } from '../../domain/update-todo';

import { TodoEntity } from './entities/todo.entity';
import { TodoMapper } from './todo.mapper';

@Injectable()
export class InMemoryTodoRepository implements TodoRepository {
  private readonly todos = new Map<TodoEntity['id'], TodoEntity>();

  async findAll(): Promise<Todo[]> {
    const entities = Array.from(this.todos.values());

    return entities.reverse().map(entity => TodoMapper.toDomain(entity));
  }

  async findById(id: Todo['id']): Promise<Todo | null> {
    const entity = this.todos.get(id);

    return entity ? TodoMapper.toDomain(entity) : null;
  }

  async save(todo: NewTodo): Promise<Todo> {
    const entity = {
      id: crypto.randomUUID(),
      ...todo,
      createdAt: new Date(),
      updatedAt: new Date(),
      completedAt: null,
    } as const satisfies TodoEntity;

    this.todos.set(entity.id, entity);

    return TodoMapper.toDomain(entity);
  }

  async update(id: Todo['id'], todo: UpdateTodo): Promise<Todo> {
    const entity = this.todos.get(id);
    assert(entity);

    const updated = { ...entity, updatedAt: new Date() } satisfies TodoEntity;

    if (todo.name !== undefined) {
      updated.name = todo.name;
    }

    if (todo.description !== undefined) {
      updated.description = todo.description;
    }

    if (todo.priority !== undefined) {
      updated.priority = todo.priority;
    }

    if (todo.completedAt !== undefined) {
      updated.completedAt = todo.completedAt;
    }

    this.todos.set(id, updated);

    return TodoMapper.toDomain(updated);
  }

  async delete(id: Todo['id']): Promise<void> {
    this.todos.delete(id);
  }
}
