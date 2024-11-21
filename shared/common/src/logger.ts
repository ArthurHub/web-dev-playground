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
/* eslint-disable @typescript-eslint/no-explicit-any */

import { getLoggingConfig, setLoggingConfigInitialized, type LogFn, type Logger } from './internal/logging-internal.js';
import { LogLevel } from './logging-config.js';

const LogLevelPriority: Record<LogLevel, number> = {
  [LogLevel.trace]: 10,
  [LogLevel.debug]: 20,
  [LogLevel.info]: 30,
  [LogLevel.warn]: 40,
  [LogLevel.error]: 50,
  [LogLevel.fatal]: 60,
  [LogLevel.off]: 0,
};

/**
 * Basic console logger implementation.
 */
class ConsoleLogger implements Logger {
  readonly level: LogLevel;

  constructor(logLevel: LogLevel) {
    this.level = logLevel;
  }

  child(): Logger {
    return this; // no-op
  }

  public trace: LogFn = (arg1: unknown, arg2?: string, ...args: any[]) => {
    if (LogLevelPriority[this.level] <= LogLevelPriority.trace) console.trace(arg1, arg2, ...args);
  };

  public debug: LogFn = (arg1: unknown, arg2?: string, ...args: any[]) => {
    if (LogLevelPriority[this.level] <= LogLevelPriority.debug) console.debug(arg1, arg2, ...args);
  };

  public info: LogFn = (arg1: unknown, arg2?: string, ...args: any[]) => {
    if (LogLevelPriority[this.level] <= LogLevelPriority.info) console.log(arg1, arg2, ...args);
  };

  public warn: LogFn = (arg1: unknown, arg2?: string, ...args: any[]) => {
    if (LogLevelPriority[this.level] <= LogLevelPriority.warn) console.warn(arg1, arg2, ...args);
  };

  public error: LogFn = (arg1: unknown, arg2?: string, ...args: any[]) => {
    if (LogLevelPriority[this.level] <= LogLevelPriority.error) console.error(arg1, arg2, ...args);
  };

  public fatal: LogFn = (arg1: unknown, arg2?: string, ...args: any[]) => {
    if (LogLevelPriority[this.level] <= LogLevelPriority.fatal) console.error(arg1, arg2, ...args);
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
    // dynamic import to avoid importing pino when not used (bundle relevant)
    const pinoLogger = await import('./internal/pino-logger.js');
    logger = pinoLogger.createPinoProxyLogger(logConfig);
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
