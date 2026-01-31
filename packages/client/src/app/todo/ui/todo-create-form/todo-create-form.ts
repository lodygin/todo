import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { form, FormField, submit, validateStandardSchema } from '@angular/forms/signals';

import { type CreateTodo, createTodo } from '../../domain/create-todo';
import { TODO_PRIORITIES } from '../../domain/todo-priority';

const INITIAL_MODEL: CreateTodo = { name: '', description: '', priority: 'medium' };

@Component({
  selector: 'app-todo-create-form',
  imports: [FormField],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './todo-create-form.css',
  template: `
    <form class="create-form" (submit)="submit($event)">
      <div class="form-field">
        <input
          type="text"
          [formField]="createTodoForm.name"
          [class.invalid]="createTodoForm.name().touched() && !createTodoForm.name().valid()"
          placeholder="Name"
        />
        @if (createTodoForm.name().touched() && !createTodoForm.name().valid()) {
          <span class="field-error">Name is required</span>
        }
      </div>

      <div class="form-field">
        <input
          type="text"
          [formField]="createTodoForm.description"
          [class.invalid]="
            createTodoForm.description().touched() && !createTodoForm.description().valid()
          "
          placeholder="Description"
        />
        @if (createTodoForm.description().touched() && !createTodoForm.description().valid()) {
          <span class="field-error">Description is required</span>
        }
      </div>

      <select [formField]="createTodoForm.priority">
        @for (p of priorities; track p) {
          <option [value]="p">{{ p }}</option>
        }
      </select>
      <button type="submit">Add</button>
    </form>
  `,
})
export class TodoCreateForm {
  protected readonly created = output<CreateTodo>();
  protected readonly priorities = TODO_PRIORITIES;

  private readonly createTodoModel = signal<CreateTodo>({ ...INITIAL_MODEL });

  protected readonly createTodoForm = form(this.createTodoModel, schema => {
    validateStandardSchema(schema, createTodo);
  });

  submit(evt: Event): void {
    evt.preventDefault();

    void submit(this.createTodoForm, async () => {
      this.created.emit(this.createTodoForm().value());
      this.createTodoForm().reset({ ...INITIAL_MODEL });
    });
  }
}
