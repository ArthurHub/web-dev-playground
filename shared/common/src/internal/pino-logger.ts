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

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import pino from 'pino';
import { LogLevel, type LoggingConfig } from '../logging-config.js';
import type { LogFn, Logger } from './logging-internal.js';

export function createPinoProxyLogger(logConfig: LoggingConfig): Logger {
  return new PinoProxyLogger(pino.default(logConfig.pino as pino.LoggerOptions));
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
