import { Observable } from 'rxjs';

import { type CreateTodo } from '../domain/create-todo';
import { type Todo } from '../domain/todo';
import { type UpdateTodo } from '../domain/update-todo';

export abstract class TodoRepository {
  abstract getAll(): Observable<Todo[]>;

  abstract create(todo: CreateTodo): Observable<Todo>;

  abstract update(id: string, todo: UpdateTodo): Observable<Todo>;

  abstract delete(id: string): Observable<void>;
}
