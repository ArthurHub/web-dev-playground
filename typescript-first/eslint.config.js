import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {
    rules: {
      'no-undef': 'warn',
      'no-unused-vars': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'error',
    },
  },
  { files: ['**/*.{ts,tsx}'] },

  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
