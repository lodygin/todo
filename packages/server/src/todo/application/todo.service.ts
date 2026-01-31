import assert from 'node:assert';

import { Injectable, NotFoundException } from '@nestjs/common';

import { Todo } from '../domain/todo';

import { CreateTodoCommand } from './create-todo.command';
import { TodoRepository } from './todo.repository';
import { UpdateTodoCommand } from './update-todo.command';

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  async create(createTodoCommand: CreateTodoCommand): Promise<Todo> {
    return this.todoRepository.save({ ...createTodoCommand });
  }

  findAll(): Promise<Todo[]> {
    return this.todoRepository.findAll();
  }

  async update(command: UpdateTodoCommand): Promise<Todo> {
    const existing = await this.todoRepository.findById(command.id);
    assert(existing, new NotFoundException(`Todo with id ${command.id} not found`));

    const { id, ...updateTodo } = command;

    return this.todoRepository.update(id, updateTodo);
  }

  async delete(id: Todo['id']): Promise<void> {
    const existing = await this.todoRepository.findById(id);
    assert(existing, new NotFoundException(`Todo with id ${id} not found`));

    return this.todoRepository.delete(id);
  }
}
