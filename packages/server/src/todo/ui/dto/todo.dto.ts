import { Expose } from 'class-transformer';

import { TodoPriority } from '../../domain/todo-priority';

export class TodoDto {
  @Expose()
  id!: string;

  @Expose()
  name!: string;

  @Expose()
  description!: string;

  @Expose()
  priority!: TodoPriority;

  @Expose()
  createdAt!: Date;

  @Expose()
  updatedAt!: Date;

  @Expose()
  completedAt!: Date | null;
}
