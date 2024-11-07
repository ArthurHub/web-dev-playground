import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    ignorePatterns: ['eslint.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        NodeJS: true,
      },
      parserOptions: {
        parser: '@typescript-eslint/parser',
        project: './tsconfig.json',
      },
    },
  },
  {
    rules: {
      'no-undef': 'warn',
      'prefer-const': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/restrict-template-expressions': [
        'warn',
        {
          allowNumber: true,
          allowBoolean: true,
        },
      ],
      '@typescript-eslint/prefer-function-type': 'warn',
      '@typescript-eslint/no-inferrable-types': 'off',
    },
    files: ['**/*.ts', '**/*.tsx'],
  },
);
