import * as path from 'path';
import * as fs from 'fs';

const logDir = path.join(process.cwd(), 'dist\\logs');

// Ensure the 'logs' directory exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logLevel = process.env.LOG_LEVEL ?? 'info';

export default {
  pino: {
    level: logLevel,
    transport: {
      targets: [
        {
          target: 'pino-pretty', // log nice string to console
          level: logLevel,
          options: {
            sync: true,
            colorize: true,
            messageFormat: '[{name}] {msg}',
            destination: 1,
            ignore: 'hostname,name',
          },
        },
        {
          target: 'pino/file', // log json to file
          level: logLevel,
          options: { destination: path.join(logDir, 'logs.log') },
        },
        {
          target: 'pino/file', // log errors to file
          level: 'error',
          options: { destination: path.join(logDir, 'errors.log') },
        },
      ],
    },
  },
};
