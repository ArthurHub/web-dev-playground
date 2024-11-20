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

import { existsSync } from 'fs';
import { pathToFileURL } from 'url';
import { join } from 'path';
import type { LoggingConfig } from '../logging-config.js';

/**
 * Flag to know if logging was already initialized.
 * Used because you need to use dynamic imports to be able to override default.
 */
let loggingInitialized: boolean;

/** Stores the default logging override set in code */
let defaultOverrideConfig: LoggingConfig | undefined;

/**
 * Set the default logging configuration to use if file config not found.
 * Order:
 * 1. Use "logging-config.js" if found in working directory.
 * 2. Use override default config if set.
 * 3. Load default config in "./logging-config.js" file.
 */
export function setOverrideDefaultLoggingConfig(config: LoggingConfig): void {
  if (loggingInitialized) {
    throw new Error('Logging already initialized. Make sure to use dynamic imports.');
  }
  defaultOverrideConfig = config;
}

/**
 * Init logging from 'logger-config.js' file in working directory or from default logger config file.
 */
export async function getLoggingConfig(): Promise<LoggingConfig> {
  // dynamic load of config file in working directory
  const cwdConfigFilePath = pathToFileURL(join(process.cwd(), 'logging-config.js'));
  if (existsSync(cwdConfigFilePath)) {
    return (await import(cwdConfigFilePath.href)) as LoggingConfig;
  }
  // use default override config if set
  if (defaultOverrideConfig) {
    return defaultOverrideConfig;
  }
  // use default config file
  return (await import('./default-logging-config.js')) as LoggingConfig;
}

export function setLoggingConfigInitialized(): void {
  loggingInitialized = true;
}
