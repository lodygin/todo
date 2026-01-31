import { HttpInterceptorFn } from '@angular/common/http';
import { InjectionToken, inject } from '@angular/core';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL', {
  providedIn: 'root',
  factory: () => '',
});

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = inject(API_BASE_URL);

  if (!baseUrl || !req.url.startsWith('/api')) {
    return next(req);
  }

  return next(req.clone({ url: `${baseUrl}${req.url}` }));
};
