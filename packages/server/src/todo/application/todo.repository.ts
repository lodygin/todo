import { NewTodo } from '../domain/new-todo';
import { Todo } from '../domain/todo';
import { UpdateTodo } from '../domain/update-todo';

export abstract class TodoRepository {
  abstract findAll(): Promise<Todo[]>;

  abstract findById(id: Todo['id']): Promise<Todo | null>;

  abstract save(todo: NewTodo): Promise<Todo>;

  abstract update(id: Todo['id'], todo: UpdateTodo): Promise<Todo>;

  abstract delete(id: Todo['id']): Promise<void>;
}
