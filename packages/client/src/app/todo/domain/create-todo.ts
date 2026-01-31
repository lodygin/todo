import { type } from 'arktype';

import { todoPriority } from './todo-priority';

export const createTodo = type({
  name: 'string > 0',
  description: 'string > 0',
  priority: todoPriority,
});

export type CreateTodo = typeof createTodo.infer;
