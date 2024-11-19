/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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

/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { existsSync } from 'fs';
import { pathToFileURL } from 'url';
import { join } from 'path';
import pino from 'pino';

enum LogLevel {
  off = 'off',
  trace = 'trace',
  debug = 'debug',
  info = 'info',
  warn = 'warn',
  error = 'error',
  fatal = 'fatal',
}

interface LogConfig {
  console?: {
    level: LogLevel;
  };
  pino?: unknown;
}

interface LogFn {
  <T extends object>(obj: T, msg?: string, ...args: any[]): void;
  (obj: unknown, msg?: string, ...args: any[]): void;
  (msg: string, ...args: any[]): void;
}

interface Logger {
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

class ConsoleLogger implements Logger {
  readonly level: LogLevel;

  constructor(logLevel: LogLevel) {
    this.level = logLevel;
  }

  child(): Logger {
    return this;
  }

  public trace: LogFn = (arg1: unknown, arg2?: string, ...args: any[]) => {
    if (this.level >= LogLevel.trace) console.trace(arg1, arg2, ...args);
  };

  public debug: LogFn = (arg1: unknown, arg2?: string, ...args: any[]) => {
    if (this.level >= LogLevel.debug) console.debug(arg1, arg2, ...args);
  };

  public info: LogFn = (arg1: unknown, arg2?: string, ...args: any[]) => {
    if (this.level >= LogLevel.info) console.log(arg1, arg2, ...args);
  };

  public warn: LogFn = (arg1: unknown, arg2?: string, ...args: any[]) => {
    if (this.level >= LogLevel.warn) console.warn(arg1, arg2, ...args);
  };

  public error: LogFn = (arg1: unknown, arg2?: string, ...args: any[]) => {
    if (this.level >= LogLevel.error) console.error(arg1, arg2, ...args);
  };

  public fatal: LogFn = (arg1: unknown, arg2?: string, ...args: any[]) => {
    if (this.level >= LogLevel.fatal) console.error(arg1, arg2, ...args);
  };
}

/**
 * Logger class to proxy logs into pino logger
 */
class PinoProxyLogger implements Logger {
  readonly level: LogLevel;
  private pinoLogger: pino.Logger;

  constructor(logger: pino.Logger) {
    this.pinoLogger = logger;
    this.level = LogLevel[logger.level as keyof typeof LogLevel];
  }

  public child(name: string): Logger {
    return new PinoProxyLogger(this.pinoLogger.child({ name: name }, {}));
  }

  public info: LogFn = (arg1: unknown, arg2?: string, ...args: any[]) => {
    this.pinoLogger.info(arg1 as any, arg2, ...args);
  };

  public error: LogFn = (arg1: unknown, arg2?: string, ...args: any[]) => {
    this.pinoLogger.error(arg1 as any, arg2, ...args);
  };

  public debug: LogFn = (arg1: unknown, arg2?: string, ...args: any[]) => {
    this.pinoLogger.debug(arg1 as any, arg2, ...args);
  };

  public warn: LogFn = (arg1: unknown, arg2?: string, ...args: any[]) => {
    this.pinoLogger.warn(arg1 as any, arg2, ...args);
  };

  public trace: LogFn = (arg1: unknown, arg2?: string, ...args: any[]) => {
    this.pinoLogger.trace(arg1 as any, arg2, ...args);
  };

  public fatal: LogFn = (arg1: unknown, arg2?: string, ...args: any[]) => {
    this.pinoLogger.fatal(arg1 as any, arg2, ...args);
  };
}

/**
 * Init logging from 'logger-config.js' file in working directory or from default logger config file.
 * TODO: can I improve typing?
 */
async function initLogging(): Promise<Logger> {
  // dynamic load of config file in working directory
  const LOGGER_CONFIG_FILENAME = 'logger-config.js';
  const cwdConfigFilePath = pathToFileURL(join(process.cwd(), LOGGER_CONFIG_FILENAME));
  const logConfigModule = existsSync(cwdConfigFilePath)
    ? await import(cwdConfigFilePath.href)
    : await import(`./${LOGGER_CONFIG_FILENAME}`);

  const logConfig = logConfigModule.config as LogConfig;
  if (logConfig.pino) {
    return new PinoProxyLogger(pino.default(logConfig.pino as pino.LoggerOptions));
  } else {
    // if console is not specified create a no-op logger
    return new ConsoleLogger(logConfig.console?.level ?? LogLevel.off);
  }
}

/** Default global logger */
export const logger: Logger = await initLogging();

/** Child logger with specific name and potentially custom properties */
export function getLogger(name: string): Logger {
  return logger.child(name);
}
