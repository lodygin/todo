import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { TodosApiService } from '../../shared/api/todos';
import { TodoRepository } from '../application/todo.repository';
import { type CreateTodo } from '../domain/create-todo';
import { type Todo, todo } from '../domain/todo';
import { type UpdateTodo } from '../domain/update-todo';

@Injectable()
export class TodoApiAdapter implements TodoRepository {
  private readonly api = inject(TodosApiService);

  getAll(): Observable<Todo[]> {
    return this.api.findAll().pipe(map(data => todo.array().assert(data)));
  }

  create(createTodo: CreateTodo): Observable<Todo> {
    return this.api.create(createTodo).pipe(map(data => todo.assert(data)));
  }

  update(id: string, updateTodo: UpdateTodo): Observable<Todo> {
    return this.api.update(id, updateTodo).pipe(map(data => todo.assert(data)));
  }

  delete(id: string): Observable<void> {
    return this.api.delete(id);
  }
}
