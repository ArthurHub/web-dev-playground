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
import path from 'path';
import { tmpdir } from 'os';

const logger = getLogger('cmd-interface');

enum Options {
  FixFileNames,
  ConvertHEICtoJPEG,
}

/** Simple cache of last used paths */
interface OneDriveFixerData {
  lastUsedPaths: string[];
}

/** Use temp dir to store cache data file */
const onedriveFixerDataFile = path.join(tmpdir(), 'onedrive-fixer-data.json');

/**
 * Run a command line user interface to select an option for OneDrive fixer.
 * Ask the user for the folder path to operate on.
 * Use a cache to store the last used paths and present select if available.
 */
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

    let folderPath = '';

    // read cache data and ask for a previously used path
    const data = readData();
    if (data.lastUsedPaths.length) {
      const choices = data.lastUsedPaths.map((path) => ({ name: path, value: path }));
      choices.push({ name: 'Other', value: '' });
      folderPath = await select({
        message: 'Select a previously used path:',
        choices,
      });
    }

    // check if we have an existing folder
    if (!folderPath || !fs.existsSync(folderPath)) {
      // Ask for file path
      folderPath = await input({
        message: 'Enter the folder path to operate on:',
        validate: (inputValue: string) => {
          return fs.existsSync(inputValue) ? true : 'The specified file path does not exist.';
        },
      });
    }

    // write the new path to the data
    writeData(data, folderPath);

    // Ask if dry run
    const isDryRun = await confirm({ message: 'Dry-run?', default: true });

    // Step 3: Perform action based on selected option
    if (option === Options.FixFileNames) {
      await runOneDriveNameDateFixer(folderPath, isDryRun);
    } else {
      logger.info(`Performing Option B on file: ${folderPath}`);
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
      `
-------------
Finished running OneDrive media file name/date fixer: 
%d media files processed
%d updated
%d no update required
%d not iPhone
%d other
-------------`,
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

// Function to read data, typed with OneDriveFixerData
function readData(): OneDriveFixerData {
  if (!fs.existsSync(onedriveFixerDataFile)) {
    return { lastUsedPaths: [] };
  }
  const data = fs.readFileSync(onedriveFixerDataFile, 'utf-8');
  return JSON.parse(data) as OneDriveFixerData;
}

// Function to write data, ensuring we use OneDriveFixerData structure
function writeData(data: OneDriveFixerData, folderPath: string): void {
  data.lastUsedPaths.unshift(folderPath);
  data.lastUsedPaths = [...new Set(data.lastUsedPaths)];
  data.lastUsedPaths = data.lastUsedPaths.slice(0, 3);
  fs.writeFileSync(onedriveFixerDataFile, JSON.stringify(data, null, 2));
}
