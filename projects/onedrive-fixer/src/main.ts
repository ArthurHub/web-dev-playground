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
import { OneDriveNameDateFixer } from './onedrive-name-date-fixer.js';
import { OneDriveFixedFileStatus, type OneDriveFixedFile } from './entities.js';

async function main(): Promise<void> {
  try {
    const handledFiles = await OneDriveNameDateFixer.updateFileNames('../test-data', true);

    const {
      updated,
      noUpdateRequired,
      SkippedNotIPhone: skippedNotIPhone,
    } = getCounts(handledFiles);
    logger.info(
      'Finished running OneDrive fixer handling %d files: %d updated, %d no update required, %d not iPhone, %d other',
      handledFiles.length,
      updated,
      noUpdateRequired,
      skippedNotIPhone,
      handledFiles.length - updated - noUpdateRequired - skippedNotIPhone,
    );
  } catch (error) {
    logger.fatal(error, 'Failed running OneDrive fixer');
  }
}

function getCounts(handledFiles: OneDriveFixedFile[]): {
  updated: number;
  noUpdateRequired: number;
  SkippedNotIPhone: number;
} {
  let updated = 0;
  let noUpdateRequired = 0;
  let SkippedNotIPhone = 0;
  for (const file of handledFiles) {
    if (file.status === OneDriveFixedFileStatus.Updated) {
      updated++;
    } else if (file.status === OneDriveFixedFileStatus.NoUpdateRequired) {
      noUpdateRequired++;
    } else if (file.status === OneDriveFixedFileStatus.SkippedNotIPhone) {
      SkippedNotIPhone++;
    }
  }
  return { updated, noUpdateRequired, SkippedNotIPhone };
}

await main();
