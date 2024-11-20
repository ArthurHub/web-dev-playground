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

/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { existsSync } from 'fs';
import { pathToFileURL } from 'url';
import { join } from 'path';
import type { LoggingConfig, LogLevel } from '../logging-config.js';

export interface LogFn {
  <T extends object>(obj: T, msg?: string, ...args: any[]): void;
  (obj: unknown, msg?: string, ...args: any[]): void;
  (msg: string, ...args: any[]): void;
}

export interface Logger {
  /**
   * Set this property to the desired logging level. In order of priority, available levels are:
   *
   * - 'fatal'
   * - 'error'
   * - 'warn'
   * - 'info'
   * - 'debug'
   * - 'trace'
   *
   * The logging level is a __minimum__ level. For instance if `logger.level` is `'info'` then all `'fatal'`, `'error'`, `'warn'`,
   * and `'info'` logs will be enabled.
   *
   * You can pass `'silent'` to disable logging.
   */
  readonly level: LogLevel;

  /** Child logger with specific name and potentially custom properties */
  child(name: string): Logger;

  /**
   * Log at `'fatal'` level the given msg. If the first argument is an object, all its properties will be included in the JSON line.
   * If more args follows `msg`, these will be used to format `msg` using `util.format`.
   *
   * @typeParam T: the interface of the object being serialized. Default is object.
   * @param obj: object to be serialized
   * @param msg: the log message to write
   * @param ...args: format string values when `msg` is a format string
   */
  fatal: LogFn;
  /**
   * Log at `'error'` level the given msg. If the first argument is an object, all its properties will be included in the JSON line.
   * If more args follows `msg`, these will be used to format `msg` using `util.format`.
   *
   * @typeParam T: the interface of the object being serialized. Default is object.
   * @param obj: object to be serialized
   * @param msg: the log message to write
   * @param ...args: format string values when `msg` is a format string
   */
  error: LogFn;
  /**
   * Log at `'warn'` level the given msg. If the first argument is an object, all its properties will be included in the JSON line.
   * If more args follows `msg`, these will be used to format `msg` using `util.format`.
   *
   * @typeParam T: the interface of the object being serialized. Default is object.
   * @param obj: object to be serialized
   * @param msg: the log message to write
   * @param ...args: format string values when `msg` is a format string
   */
  warn: LogFn;
  /**
   * Log at `'info'` level the given msg. If the first argument is an object, all its properties will be included in the JSON line.
   * If more args follows `msg`, these will be used to format `msg` using `util.format`.
   *
   * @typeParam T: the interface of the object being serialized. Default is object.
   * @param obj: object to be serialized
   * @param msg: the log message to write
   * @param ...args: format string values when `msg` is a format string
   */
  info: LogFn;
  /**
   * Log at `'debug'` level the given msg. If the first argument is an object, all its properties will be included in the JSON line.
   * If more args follows `msg`, these will be used to format `msg` using `util.format`.
   *
   * @typeParam T: the interface of the object being serialized. Default is object.
   * @param obj: object to be serialized
   * @param msg: the log message to write
   * @param ...args: format string values when `msg` is a format string
   */
  debug: LogFn;
  /**
   * Log at `'trace'` level the given msg. If the first argument is an object, all its properties will be included in the JSON line.
   * If more args follows `msg`, these will be used to format `msg` using `util.format`.
   *
   * @typeParam T: the interface of the object being serialized. Default is object.
   * @param obj: object to be serialized
   * @param msg: the log message to write
   * @param ...args: format string values when `msg` is a format string
   */
  trace: LogFn;
}

/**
 * Flag to know if logging was already initialized.
 * Used because you need to use dynamic imports to be able to override default.
 */
let loggingInitialized: boolean;

/** Stores the default logging override set in code */
let defaultOverrideConfig: LoggingConfig | undefined;

/**
 * Set the default logging configuration to use if "logging-config.js" file config not found.
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
  const loggingConfigFilePath = process.env['LOG_CONFIG_FILE'] ?? 'logging-config.js';
  const cwdConfigFilePath = pathToFileURL(join(process.cwd(), loggingConfigFilePath));
  if (existsSync(cwdConfigFilePath)) {
    return (await import(cwdConfigFilePath.href)) as LoggingConfig;
  }
  // use default override config if set
  if (defaultOverrideConfig) {
    return defaultOverrideConfig;
  }
  // use common default config file
  return (await import('./default-logging-config.js')) as LoggingConfig;
}

/** Mark to prevent logging config override after initialization is complete */
export function setLoggingConfigInitialized(): void {
  loggingInitialized = true;
}
