import { type } from 'arktype';

import { todoPriority } from './todo-priority';

export const updateTodo = type({
  'name?': 'string > 0',
  'description?': 'string > 0',
  'priority?': todoPriority,
  'completedAt?': 'string | null',
});

export type UpdateTodo = typeof updateTodo.infer;
