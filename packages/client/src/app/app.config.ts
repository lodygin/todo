import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';

import { API_BASE_URL, baseUrlInterceptor } from './common/interceptors/base-url.interceptor';
import { TodoRepository } from './todo/application/todo.repository';
import { TodoApiAdapter } from './todo/infrastructure/todo-api.adapter';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(withInterceptors([baseUrlInterceptor])),
    { provide: API_BASE_URL, useValue: 'http://localhost:3000' },
    { provide: TodoRepository, useClass: TodoApiAdapter },
  ],
};
