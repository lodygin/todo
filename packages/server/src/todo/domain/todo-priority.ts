export const TODO_PRIORITIES = ['low', 'medium', 'high'] as const;
export type TodoPriority = (typeof TODO_PRIORITIES)[number];
