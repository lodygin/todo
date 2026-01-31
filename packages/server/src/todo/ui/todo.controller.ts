import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { SerializeInterceptor } from '../../common/interceptors/serialize.interceptor';
import { TodoService } from '../application/todo.service';
import { Todo } from '../domain/todo';

import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoDto } from './dto/todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseInterceptors(new SerializeInterceptor(TodoDto))
  @Post()
  create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoService.create({ ...createTodoDto });
  }

  @UseInterceptors(new SerializeInterceptor(TodoDto))
  @Get()
  findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @UseInterceptors(new SerializeInterceptor(TodoDto))
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: Todo['id'],
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    return this.todoService.update({ id, ...updateTodoDto });
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe) id: Todo['id']): Promise<void> {
    await this.todoService.delete(id);
  }
}
