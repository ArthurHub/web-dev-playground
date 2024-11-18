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
import { OneDriveFileToFixStatus, type OneDriveFileToFix } from './entities.js';
import path from 'path';
import { tmpdir } from 'os';
import { HEICtoJpegConverter } from './heic-to-jpeg-converter.js';

const logger = getLogger('cmd-interface');

enum Options {
  FixFileNames,
  ConvertHEICtoJPEG,
  Exit,
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
export async function runOneDriveFixerCmdUserInterface(): Promise<void> {
  try {
    let option;
    while (option !== Options.Exit) {
      option = await getUserChoice();
      switch (option) {
        case Options.FixFileNames:
          await runOneDriveNameDateFixer();
          break;
        case Options.ConvertHEICtoJPEG:
          await runHEICtoJPEGConverter();
          break;
      }
    }
  } catch (error) {
    logger.error('Error:', error);
  }
}

async function getUserChoice(): Promise<Options> {
  return await select({
    message: 'Select an option:',
    choices: [
      { name: 'Fix OneDrive media file names', value: Options.FixFileNames },
      { name: 'Convert HEIC photos to JPEG', value: Options.ConvertHEICtoJPEG },
      { name: 'Exit', value: Options.Exit },
    ],
  });
}

async function promptForFolderPath(): Promise<string> {
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
  return folderPath;
}

async function runOneDriveNameDateFixer(): Promise<void> {
  try {
    const folderPath = await promptForFolderPath();

    logger.info(`Run fix media files names in: "${folderPath}"`);
    const handledFiles = await OneDriveNameDateFixer.scan(folderPath, (folder, files) => {
      console.log(`Scanned folder: ${folder} - ${files.length} files`);
    });

    const { updateRequired, noUpdateRequired, skippedNotIPhone } = getCounts(handledFiles);
    console.log(
      `
Finished running OneDrive media file name/date fixer: 
%d media files found
%d require fixing
%d already correct
%d not iPhone
%d other`,
      handledFiles.length,
      updateRequired,
      noUpdateRequired,
      skippedNotIPhone,
      handledFiles.length - updateRequired - noUpdateRequired - skippedNotIPhone,
    );

    if (updateRequired < 1) {
      console.log('No files to fix');
      return;
    }

    const { run, dryRun } = await getRunConfirmationChoice();
    if (!run) {
      return;
    }

    const fixProgCallback = (index: number, total: number, file: OneDriveFileToFix): void => {
      console.log(`Updated file ${index} of ${total}: ${file.file.name} --> ${file.newName}`);
    };

    if (dryRun) {
      await OneDriveNameDateFixer.fix(handledFiles.slice(), dryRun, fixProgCallback);

      const runReal = await confirm({ message: 'Run the fix for real?', default: false });
      if (!runReal) {
        return;
      }
    }

    await OneDriveNameDateFixer.fix(handledFiles, dryRun, fixProgCallback);
  } catch (error) {
    logger.fatal(error, 'Failed running OneDrive name date fixer');
  }
}

function getCounts(handledFiles: OneDriveFileToFix[]): {
  updateRequired: number;
  noUpdateRequired: number;
  skippedNotIPhone: number;
} {
  let updated = 0;
  let noUpdateRequired = 0;
  let skippedNotIPhone = 0;
  for (const file of handledFiles) {
    if (file.status === OneDriveFileToFixStatus.UpdateRequired) {
      updated++;
    } else if (file.status === OneDriveFileToFixStatus.NoUpdateRequired) {
      noUpdateRequired++;
    } else if (file.status === OneDriveFileToFixStatus.SkippedNotIPhone) {
      skippedNotIPhone++;
    }
  }
  return { updateRequired: updated, noUpdateRequired, skippedNotIPhone };
}

async function runHEICtoJPEGConverter(): Promise<void> {
  const folderPath = await promptForFolderPath();

  const { run, dryRun } = await getRunConfirmationChoice();
  if (!run) {
    return;
  }

  logger.info(`Run fix media files names in: "${folderPath}"`);
  const { convertedPhotos, failedPhotos } = await HEICtoJpegConverter.convertFolder(folderPath, dryRun);
  logger.info(
    `
-------------
Finished running HEIC to JPEG converter: 
%d converted
%d failed
-------------`,
    convertedPhotos.length,
    failedPhotos.size,
  );
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

async function getRunConfirmationChoice(): Promise<{ run: boolean; dryRun: boolean }> {
  return await select({
    message: 'Run?:',
    choices: [
      { name: 'Yes', value: { run: true, dryRun: false } },
      { name: 'Dry-Run', value: { run: true, dryRun: true } },
      { name: 'Cancel', value: { run: false, dryRun: false } },
    ],
  });
}
