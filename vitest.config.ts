// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    restoreMocks: true,
    environment: 'node',
    setupFiles: ['./shared/common/tests/setup/setup-test-env.ts'],
    include: ['projects/**/tests/**/*.test.ts', 'shared/**/tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
    },
  },
});
