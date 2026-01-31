import { DynamicModule, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

import { ApplicationBootstrapOptions } from './common/types/application-bootstrap';
import { CoreModule } from './core/core.module';
import { TodoModule } from './todo/application/todo.module';
import { TodoInfrastructureModule } from './todo/infrastructure/todo-infrastructure.module';

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableCircularCheck: true,
          enableImplicitConversion: true,
        },
      }),
    },
  ],
})
export class AppModule {
  static register(options: ApplicationBootstrapOptions): DynamicModule {
    return {
      module: AppModule,
      imports: [
        CoreModule.forRoot(options),
        TodoModule.withInfrastructure(TodoInfrastructureModule.use(options.driver)),
      ],
    };
  }
}
