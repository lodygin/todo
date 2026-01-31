import { HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap, pipe, switchMap } from 'rxjs';

import { type CreateTodo } from '../domain/create-todo';
import { type Todo } from '../domain/todo';
import { type UpdateTodo } from '../domain/update-todo';

import { TodoRepository } from './todo.repository';

type TodoState =
  | { status: 'idle'; todos: Todo[] }
  | { status: 'loading'; todos: Todo[] }
  | { status: 'loaded'; todos: Todo[] }
  | { status: 'error'; todos: Todo[]; error: string };

@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly api = inject(TodoRepository);
  private readonly state = signal<TodoState>({ status: 'idle', todos: [] });

  readonly todos = computed(() => this.state().todos);
  readonly loading = computed(() => this.state().status === 'loading');
  readonly error = computed(() => {
    const s = this.state();

    return s.status === 'error' ? s.error : null;
  });

  readonly loadTodos = rxMethod<void>(
    pipe(
      switchMap(() => {
        this.state.set({ status: 'loading', todos: this.state().todos });

        return this.api.getAll().pipe(
          tapResponse({
            next: todos => this.state.set({ status: 'loaded', todos }),
            error: (e: HttpErrorResponse) =>
              this.state.set({ status: 'error', todos: this.state().todos, error: e.message }),
          }),
        );
      }),
    ),
  );

  readonly createTodo = rxMethod<CreateTodo>(
    pipe(
      exhaustMap(todo =>
        this.api.create(todo).pipe(
          tapResponse({
            next: created =>
              this.state.set({ status: 'loaded', todos: [created, ...this.state().todos] }),
            error: (e: HttpErrorResponse) =>
              this.state.set({ status: 'error', todos: this.state().todos, error: e.message }),
          }),
        ),
      ),
    ),
  );

  readonly updateTodo = rxMethod<{ id: string; data: UpdateTodo }>(
    pipe(
      exhaustMap(({ id, data }) =>
        this.api.update(id, data).pipe(
          tapResponse({
            next: updated =>
              this.state.set({
                status: 'loaded',
                todos: this.state().todos.map(item => (item.id === updated.id ? updated : item)),
              }),
            error: (e: HttpErrorResponse) =>
              this.state.set({ status: 'error', todos: this.state().todos, error: e.message }),
          }),
        ),
      ),
    ),
  );

  readonly toggleTodo = rxMethod<Todo>(
    pipe(
      exhaustMap(todo =>
        this.api
          .update(todo.id, { completedAt: todo.completedAt ? null : new Date().toISOString() })
          .pipe(
            tapResponse({
              next: updated =>
                this.state.set({
                  status: 'loaded',
                  todos: this.state().todos.map(item => (item.id === updated.id ? updated : item)),
                }),
              error: (e: HttpErrorResponse) =>
                this.state.set({ status: 'error', todos: this.state().todos, error: e.message }),
            }),
          ),
      ),
    ),
  );

  readonly deleteTodo = rxMethod<string>(
    pipe(
      exhaustMap(id =>
        this.api.delete(id).pipe(
          tapResponse({
            next: () =>
              this.state.set({
                status: 'loaded',
                todos: this.state().todos.filter(t => t.id !== id),
              }),
            error: (e: HttpErrorResponse) =>
              this.state.set({ status: 'error', todos: this.state().todos, error: e.message }),
          }),
        ),
      ),
    ),
  );
}
