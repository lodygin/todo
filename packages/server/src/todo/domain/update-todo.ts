import { Timestamp } from '../../common/types/timestamp';

import { Todo } from './todo';

export type UpdateTodo = Partial<Omit<Todo, keyof Timestamp | 'id'>>;
