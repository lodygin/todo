import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';

import { TodoService } from '../../application/todo.service';
import { type CreateTodo } from '../../domain/create-todo';
import { type Todo } from '../../domain/todo';
import { type UpdateTodo } from '../../domain/update-todo';
import { TodoCreateForm } from '../todo-create-form/todo-create-form';
import { TodoItem } from '../todo-item/todo-item';

@Component({
  selector: 'app-todo-list',
  imports: [TodoCreateForm, TodoItem],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './todo-list.css',
  template: `
    <h1>Todos</h1>
    <app-todo-create-form (created)="create($event)" />

    @if (loading()) {
      <p>Loading...</p>
    }

    @if (error(); as error) {
      <p class="error">{{ error }}</p>
    }

    <div class="todo-items">
      @for (todo of todos(); track todo.id) {
        <app-todo-item
          [todo]="todo"
          (toggled)="toggle(todo)"
          (priorityChanged)="update(todo.id, { priority: $event })"
          (deleted)="delete(todo.id)"
        />
      } @empty {
        @if (!loading()) {
          <p>No todos yet.</p>
        }
      }
    </div>
  `,
})
export class TodoList implements OnInit {
  private readonly todoService = inject(TodoService);

  protected readonly todos = this.todoService.todos;
  protected readonly loading = this.todoService.loading;
  protected readonly error = this.todoService.error;

  ngOnInit(): void {
    this.todoService.loadTodos();
  }

  protected create(dto: CreateTodo): void {
    this.todoService.createTodo(dto);
  }

  protected toggle(todo: Todo): void {
    this.todoService.toggleTodo(todo);
  }

  protected update(id: string, data: UpdateTodo): void {
    this.todoService.updateTodo({ id, data });
  }

  protected delete(id: string): void {
    this.todoService.deleteTodo(id);
  }
}
