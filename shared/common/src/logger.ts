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

import { getLoggingConfig, setLoggingConfigInitialized } from './internal/logging-config-internal.js';
import { LogLevel } from './logging-config.js';
import pino from 'pino';

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

const LogLevelPriority: Record<LogLevel, number> = {
  [LogLevel.trace]: 10,
  [LogLevel.debug]: 20,
  [LogLevel.info]: 30,
  [LogLevel.warn]: 40,
  [LogLevel.error]: 50,
  [LogLevel.fatal]: 60,
  [LogLevel.off]: 0,
};

class ConsoleLogger implements Logger {
  readonly level: LogLevel;

  constructor(logLevel: LogLevel) {
    this.level = logLevel;
  }

  child(): Logger {
    return this;
  }

  public trace: LogFn = (arg1: unknown, arg2?: string, ...args: any[]) => {
    if (LogLevelPriority[this.level] >= LogLevelPriority.trace) console.trace(arg1, arg2, ...args);
  };

  public debug: LogFn = (arg1: unknown, arg2?: string, ...args: any[]) => {
    if (LogLevelPriority[this.level] >= LogLevelPriority.debug) console.debug(arg1, arg2, ...args);
  };

  public info: LogFn = (arg1: unknown, arg2?: string, ...args: any[]) => {
    if (LogLevelPriority[this.level] >= LogLevelPriority.info) console.log(arg1, arg2, ...args);
  };

  public warn: LogFn = (arg1: unknown, arg2?: string, ...args: any[]) => {
    if (LogLevelPriority[this.level] >= LogLevelPriority.warn) console.warn(arg1, arg2, ...args);
  };

  public error: LogFn = (arg1: unknown, arg2?: string, ...args: any[]) => {
    if (LogLevelPriority[this.level] >= LogLevelPriority.error) console.error(arg1, arg2, ...args);
  };

  public fatal: LogFn = (arg1: unknown, arg2?: string, ...args: any[]) => {
    if (LogLevelPriority[this.level] >= LogLevelPriority.fatal) console.error(arg1, arg2, ...args);
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
 * Initialize logging with optional override configuration.
 * Must be called before any log usage.
 * Order of logging config:
 * 1. Use "logging-config.js" if found in working directory.
 * 2. Use override default config if set.
 * 3. Load default config in "./logging-config.js" file.
 *
 * @param overrideDefault: override default logging configuration
 */
async function initLogging(): Promise<Logger> {
  const logConfig = await getLoggingConfig();
  let logger: Logger;
  if (logConfig.pino) {
    logger = new PinoProxyLogger(pino.default(logConfig.pino as pino.LoggerOptions));
  } else {
    // if console is not specified create a no-op logger
    logger = new ConsoleLogger(logConfig.console?.level ?? LogLevel.off);
  }
  setLoggingConfigInitialized();
  return logger;
}

/** Top level logger */
export const logger: Logger = await initLogging();

/** Logger with specific name and potentially custom properties */
export function getLogger(name: string): Logger {
  return logger.child(name);
}
