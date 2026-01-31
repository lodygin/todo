import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TodoList } from './todo/ui/todo-list/todo-list';

@Component({
  selector: 'app-root',
  imports: [TodoList],
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-todo-list />`,
})
export class App {}
