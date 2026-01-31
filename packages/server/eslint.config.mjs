// @ts-check
import baseConfig from '../../eslint.config.mjs';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config({ ignores: ['eslint.config.mjs', 'dist/'] }, ...baseConfig, {
  languageOptions: {
    globals: { ...globals.node, ...globals.jest },
    sourceType: 'commonjs',
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  rules: {
    '@typescript-eslint/require-await': 'off',
  },
});
