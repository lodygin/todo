import { IsIn, IsNotEmpty, IsString } from 'class-validator';

import { TODO_PRIORITIES, TodoPriority } from '../../domain/todo-priority';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsIn(TODO_PRIORITIES)
  priority!: TodoPriority;
}
