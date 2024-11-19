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

import { logger } from 'common/logger.js';
import { runOneDriveFixerCmdUserInterface } from './cmd-interface.js';

async function main(): Promise<void> {
  try {
    logger.info('Starting OneDrive Fixer');
    await runOneDriveFixerCmdUserInterface();
  } catch (error) {
    logger.fatal(error, 'Exception in main');
  }
}

await main();
