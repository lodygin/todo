import { TimestampEntity } from '../../../../common/entities/timestamp.entity';
import { TodoPriority } from '../../../domain/todo-priority';

export type TodoEntity = TimestampEntity & {
  id: string;
  name: string;
  description: string;
  priority: TodoPriority;
  completedAt: Date | null;
};
