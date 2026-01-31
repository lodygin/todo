import { TodoPriority } from '../domain/todo-priority';

export type CreateTodoCommand = {
  name: string;
  description: string;
  priority: TodoPriority;
};
