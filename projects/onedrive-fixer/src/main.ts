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

import { LogLevel, overrideDefaultLoggingConfig } from 'common/logging-config.js';
overrideDefaultLoggingConfig({
  console: {
    level: LogLevel.warn,
  },
});

async function main(): Promise<void> {
  // must be dynamic import for logging default override to work
  const logging = await import('common/logger.js');
  const cmdInterface = await import('./cmd-interface.js');
  try {
    logging.logger.info('Starting OneDrive Fixer');
    await cmdInterface.runOneDriveFixerCmdUserInterface();
  } catch (error) {
    logging.logger.fatal(error, 'Exception in main');
  }
}

await main();
