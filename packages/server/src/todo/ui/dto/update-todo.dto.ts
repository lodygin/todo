import { Type } from 'class-transformer';
import { IsDate, IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { TODO_PRIORITIES, TodoPriority } from '../../domain/todo-priority';

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsIn(TODO_PRIORITIES)
  priority?: TodoPriority;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  completedAt?: Date | null;
}
