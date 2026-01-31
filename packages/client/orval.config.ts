import { defineConfig } from 'orval';

export default defineConfig({
  todo: {
    input: {
      target: 'http://localhost:3000/api/docs-json',
      override: {
        transformer: spec => ({ ...spec, info: { ...spec.info, title: 'api' } }),
      },
    },
    output: {
      target: './src/app/shared/api/',
      client: 'angular',
      mode: 'tags',
      override: {
        operationName: (operation: { operationId?: string }) =>
          operation.operationId
            ? operation.operationId.replace(/^.*?_/, '').replace(/_v\d+$/, '')
            : '',
        angular: {
          provideIn: 'root',
        },
        title: title => `${title}Api`,
      },
    },
  },
});
