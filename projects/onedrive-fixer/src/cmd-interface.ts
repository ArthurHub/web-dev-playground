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

import { select, input, confirm } from '@inquirer/prompts';
import { getLogger } from 'common/logger.js';
import * as fs from 'fs';
import { OneDriveNameDateFixer } from './onedrive-name-date-fixer.js';
import { OneDriveFixedFileStatus, type OneDriveFixedFile } from './entities.js';

const logger = getLogger('cmd-interface');

enum Options {
  FixFileNames,
  ConvertHEICtoJPEG,
}

export async function runOneDriveFixerCmdUserInterface() {
  try {
    // Step 1: Select an option
    const option = await select({
      message: 'Select an option:',
      choices: [
        { name: 'Fix OneDrive media file names', value: Options.FixFileNames },
        { name: 'Convert HEIC photos to JPEG', value: Options.ConvertHEICtoJPEG },
      ],
    });

    // Step 2: Ask for file path
    const filePath = await input({
      message: 'Enter the folder path to operate on:',
      validate: (inputValue: string) => {
        return fs.existsSync(inputValue) ? true : 'The specified file path does not exist.';
      },
    });

    // Ask if dry run
    const isDryRun = await confirm({ message: 'Dry-run?', default: true });

    // Step 3: Perform action based on selected option
    if (option === Options.FixFileNames) {
      await runOneDriveNameDateFixer(filePath, isDryRun);
    } else {
      logger.info(`Performing Option B on file: ${filePath}`);
      // Add the logic for Option B here
    }
  } catch (error) {
    logger.error('Error:', error);
  }
}

async function runOneDriveNameDateFixer(filePath: string, isDryRun: boolean): Promise<void> {
  try {
    logger.info(`Run fix media files names in: "${filePath}"`);
    const handledFiles = await OneDriveNameDateFixer.fixFileNames(filePath, true);

    const { updated, noUpdateRequired, skippedNotIPhone } = getCounts(handledFiles);
    logger.info(
      'Finished running OneDrive fixer handling %d files: %d updated, %d no update required, %d not iPhone, %d other',
      handledFiles.length,
      updated,
      noUpdateRequired,
      skippedNotIPhone,
      handledFiles.length - updated - noUpdateRequired - skippedNotIPhone,
    );
  } catch (error) {
    logger.fatal(error, 'Failed running OneDrive name date fixer');
  }
}

function getCounts(handledFiles: OneDriveFixedFile[]): {
  updated: number;
  noUpdateRequired: number;
  skippedNotIPhone: number;
} {
  let updated = 0;
  let noUpdateRequired = 0;
  let skippedNotIPhone = 0;
  for (const file of handledFiles) {
    if (file.status === OneDriveFixedFileStatus.Updated) {
      updated++;
    } else if (file.status === OneDriveFixedFileStatus.NoUpdateRequired) {
      noUpdateRequired++;
    } else if (file.status === OneDriveFixedFileStatus.SkippedNotIPhone) {
      skippedNotIPhone++;
    }
  }
  return { updated, noUpdateRequired, skippedNotIPhone };
}
