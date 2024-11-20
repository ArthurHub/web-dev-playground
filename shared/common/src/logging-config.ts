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

import { setOverrideDefaultLoggingConfig } from './internal/logging-internal.js';

/**
 * The available log level in order of priority from least to most.
 */
export enum LogLevel {
  off = 'off',
  trace = 'trace',
  debug = 'debug',
  info = 'info',
  warn = 'warn',
  error = 'error',
  fatal = 'fatal',
}

/**
 * Configuration structure for logging.
 */
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
 * 1. Use LOG_CONFIG_FILE environment variable if set otherwise use "logging-config.js" for logging config file.
 * 1. If logging config file found by the path, use it.
 * 2. If override default config if set via code, use it.
 * 3. Load default config in "./internal/default-logging-config.js" file.
 */
export function overrideDefaultLoggingConfig(config: LoggingConfig): void {
  setOverrideDefaultLoggingConfig(config);
}
