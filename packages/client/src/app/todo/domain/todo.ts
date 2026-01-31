import { type } from 'arktype';

import { todoPriority } from './todo-priority';

export const todo = type({
  id: 'string',
  name: 'string',
  description: 'string',
  priority: todoPriority,
  createdAt: 'string',
  updatedAt: 'string',
  completedAt: 'string | null',
});

export type Todo = typeof todo.infer;
