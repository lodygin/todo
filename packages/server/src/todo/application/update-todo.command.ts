import { TodoPriority } from '../domain/todo-priority';

export type UpdateTodoCommand = {
  id: string;
  name?: string;
  description?: string;
  priority?: TodoPriority;
  completedAt?: Date | null;
};
