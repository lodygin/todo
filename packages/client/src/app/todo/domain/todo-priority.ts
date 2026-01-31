import { type } from 'arktype';

export const TODO_PRIORITIES = ['low', 'medium', 'high'] as const;

export const todoPriority = type("'low' | 'medium' | 'high'");

export type TodoPriority = typeof todoPriority.infer;
