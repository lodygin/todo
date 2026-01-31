import assert from 'node:assert';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TodoRepository } from '../../application/todo.repository';
import { NewTodo } from '../../domain/new-todo';
import { Todo } from '../../domain/todo';
import { UpdateTodo } from '../../domain/update-todo';

import { TodoEntity } from './entities/todo.entity';
import { TodoMapper } from './todo.mapper';

@Injectable()
export class OrmTodoRepository implements TodoRepository {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  async findAll(): Promise<Todo[]> {
    const entities = await this.todoRepository.find();

    return entities.map(entity => TodoMapper.toDomain(entity));
  }

  async findById(id: Todo['id']): Promise<Todo | null> {
    const entity = await this.todoRepository.findOneBy({ id });

    return entity ? TodoMapper.toDomain(entity) : null;
  }

  async save(todo: NewTodo): Promise<Todo> {
    const entity = this.todoRepository.create(todo);
    const newEntity = await this.todoRepository.save(entity);

    return TodoMapper.toDomain(newEntity);
  }

  async update(id: Todo['id'], todo: UpdateTodo): Promise<Todo> {
    const entity = await this.todoRepository.findOneBy({ id });
    assert(entity);

    if (todo.name !== undefined) {
      entity.name = todo.name;
    }

    if (todo.description !== undefined) {
      entity.description = todo.description;
    }

    if (todo.priority !== undefined) {
      entity.priority = todo.priority;
    }

    if (todo.completedAt !== undefined) {
      entity.completedAt = todo.completedAt;
    }

    const updatedEntity = await this.todoRepository.save(entity);

    return TodoMapper.toDomain(updatedEntity);
  }

  async delete(id: Todo['id']): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
