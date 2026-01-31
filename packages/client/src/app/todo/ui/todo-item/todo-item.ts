import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { type Todo } from '../../domain/todo';
import { type TodoPriority, TODO_PRIORITIES } from '../../domain/todo-priority';

@Component({
  selector: 'app-todo-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="todo-item" [class.completed]="todo().completedAt">
      <input type="checkbox" [checked]="!!todo().completedAt" (change)="toggled.emit()" />
      <div class="todo-content">
        <span class="todo-name">{{ todo().name }}</span>
        <span class="todo-description">{{ todo().description }}</span>
        <span
          class="todo-priority"
          [attr.data-priority]="todo().priority"
          (click)="cyclePriority()"
        >
          {{ todo().priority }}
        </span>
      </div>
      <button class="todo-delete" (click)="deleted.emit()">Delete</button>
    </div>
  `,
  styleUrl: './todo-item.css',
})
export class TodoItem {
  readonly todo = input.required<Todo>();

  protected readonly toggled = output<void>();
  protected readonly deleted = output<void>();
  protected readonly priorityChanged = output<TodoPriority>();

  protected cyclePriority(): void {
    const current = this.todo().priority;
    const index = TODO_PRIORITIES.indexOf(current);
    const next = TODO_PRIORITIES[(index + 1) % TODO_PRIORITIES.length]!;

    this.priorityChanged.emit(next);
  }
}
