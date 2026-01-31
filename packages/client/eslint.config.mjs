// @ts-check
import angularEslint from 'angular-eslint';
import baseConfig from '../../eslint.config.mjs';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['eslint.config.mjs', 'dist/', '.angular/', 'src/app/shared/api/'] },
  {
    files: ['**/*.ts'],
    extends: [...baseConfig],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['**/*.ts'],
    extends: [...angularEslint.configs.tsRecommended],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'app', style: 'camelCase' },
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' },
      ],
      '@angular-eslint/component-class-suffix': 'off',
      '@angular-eslint/prefer-on-push-component-change-detection': 'error',
      '@typescript-eslint/require-await': 'off',
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      ...angularEslint.configs.templateRecommended,
      ...angularEslint.configs.templateAccessibility,
    ],
    rules: {
      '@angular-eslint/template/i18n': 'off',
    },
  },
);
