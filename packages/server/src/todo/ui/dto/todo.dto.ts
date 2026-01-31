import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { TODO_PRIORITIES, TodoPriority } from '../../domain/todo-priority';

export class TodoDto {
  @ApiProperty({ format: 'uuid' })
  @Expose()
  id!: string;

  @ApiProperty()
  @Expose()
  name!: string;

  @ApiProperty()
  @Expose()
  description!: string;

  @ApiProperty({ enum: TODO_PRIORITIES })
  @Expose()
  priority!: TodoPriority;

  @ApiProperty()
  @Expose()
  createdAt!: Date;

  @ApiProperty()
  @Expose()
  updatedAt!: Date;

  @ApiProperty({ type: Date, nullable: true })
  @Expose()
  completedAt!: Date | null;
}
