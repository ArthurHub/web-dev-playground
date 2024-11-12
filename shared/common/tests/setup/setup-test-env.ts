import { vi } from 'vitest';

vi.mock('common/logger.js', () => ({
  getLogger: vi.fn(() => ({
    info: vi.fn(),
    fatal: vi.fn(),
    debug: vi.fn(),
    warn: vi.fn(),
    trace: vi.fn(),
  })),
}));
