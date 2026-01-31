import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { SerializeInterceptor } from '../../common/interceptors/serialize.interceptor';
import { TodoService } from '../application/todo.service';
import { Todo } from '../domain/todo';

import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoDto } from './dto/todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@ApiTags('todos')
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @ApiCreatedResponse({ type: TodoDto })
  @UseInterceptors(new SerializeInterceptor(TodoDto))
  @Post()
  create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoService.create({ ...createTodoDto });
  }

  @ApiOkResponse({ type: [TodoDto] })
  @UseInterceptors(new SerializeInterceptor(TodoDto))
  @Get()
  findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @ApiOkResponse({ type: TodoDto })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @UseInterceptors(new SerializeInterceptor(TodoDto))
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: Todo['id'],
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    return this.todoService.update({ id, ...updateTodoDto });
  }

  @ApiNoContentResponse({ description: 'Todo deleted' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDPipe) id: Todo['id']): Promise<void> {
    await this.todoService.delete(id);
  }
}
