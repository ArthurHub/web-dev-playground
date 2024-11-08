import fs from 'fs';
import path from 'path';
import pino from 'pino';

const pinoLogger = pino.default({
  level: process.env['LOG_LEVEL'] || 'debug', // default log level
  transport: {
    targets: [
      {
        target: 'pino-pretty', // log nice string to console
        level: 'debug',
        options: {
          sync: true,
          colorize: true,
          messageFormat: '[{name}] {msg}',
          destination: 1,
        },
      },
      {
        target: 'pino/file', // log json to file
        level: 'info',
        options: { destination: './logs/info.log' },
      },
      //   {
      //     target: 'pino/file', // log errors to file
      //     level: 'error',
      //     options: { destination: './logs/error.log' },
      //   },
      //   { // file with rolling functionality
      //     target: 'pino-roll',
      //     options: { file: '.logs/info.log', frequency: 'daily', mkdir: true }
      //   }
    ],
  },
});

interface LogFn extends pino.LogFn {}

/**
 * Logger class to proxy logs to pino logger
 */
class ProxyLogger {
  /** Actual pino logger to proxy all logs to */
  private pinoLogger: pino.Logger;

  constructor(logger: pino.Logger) {
    this.pinoLogger = logger;
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

function init(): void {
  const logDir = path.join(process.cwd(), 'logs');

  // Ensure the 'logs' directory exists
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
}
init();

/** Global logger without a name */
export const logger = new ProxyLogger(pinoLogger);

/** Child logger with specific name and potentially custom properties */
export function getLogger(name: string): ProxyLogger {
  return new ProxyLogger(pinoLogger.child({ name: name }, {}));
}
