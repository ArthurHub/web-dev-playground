// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    restoreMocks: true,
    environment: 'node',
    setupFiles: ['./shared/common/test/setup/setup-test-env.ts'],
    include: ['projects/**/test/**/*.test.ts', 'shared/**/test/**/*.test.ts'],
    coverage: {
      provider: 'v8',
    },
  },
});
