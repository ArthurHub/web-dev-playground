// Therefore those skilled at the unorthodox
// are infinite as heaven and earth,
// inexhaustible as the great rivers.
// When they come to an end,
// they begin again,
// like the days and months;
// they die and are reborn,
// like the four seasons.
//
// - Sun Tsu, The Art of War.
//
// ArthurHub, 2024

import { setOverrideDefaultLoggingConfig } from './internal/logging-config-internal.js';

export enum LogLevel {
  off = 'off',
  trace = 'trace',
  debug = 'debug',
  info = 'info',
  warn = 'warn',
  error = 'error',
  fatal = 'fatal',
}

export interface LoggingConfig {
  console?: {
    level: LogLevel;
  };
  pino?: unknown;
}

/**
 * Set the default logging configuration to use if "logging-config.js" file config not found in current
 * working directory or by LOG_CONFIG_FILE environment variable.
 * Order:
 * 1. Use "logging-config.js" if found in working directory.
 * 2. Use override default config if set.
 * 3. Load default config in "./logging-config.js" file.
 */
export function overrideDefaultLoggingConfig(config: LoggingConfig): void {
  setOverrideDefaultLoggingConfig(config);
}
