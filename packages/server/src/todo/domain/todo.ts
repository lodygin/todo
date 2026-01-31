import { Timestamp } from '../../common/types/timestamp';

import { TodoPriority } from './todo-priority';

export type Todo = Timestamp & {
  id: string;
  name: string;
  description: string;
  priority: TodoPriority;
  completedAt: Date | null;
};
