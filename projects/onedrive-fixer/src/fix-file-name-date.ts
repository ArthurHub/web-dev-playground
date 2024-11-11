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

import { Dirent, promises as fs } from 'fs';
import { join, resolve } from 'path';
import { exiftool } from 'exiftool-vendored';
import { getLogger } from 'common/logger.js';
import { iterateFiles, iterateFilesByExtensionFilter } from 'common/filesystem.js';

/** The media files extensions supported by this script. */
const supportedExtensions = ['.heic', '.jpg', '.jpeg', '.png', '.mp4', '.mov'];

const IPHONE_MAKE = 'apple';

const logger = getLogger('fix-file-name-date');

export async function updateFileNames(folderPath: string, dryRun: boolean = false): Promise<void> {
  try {
    logger.info('Starting file name update process in "%s"', resolve(folderPath));
    const processFn = (file: Dirent): Promise<void> => processFile(file, dryRun);
    await iterateFiles(folderPath, processFn, iterateFilesByExtensionFilter(supportedExtensions));
  } catch (error) {
    logger.fatal(error, 'Error updating file names:');
  } finally {
    logger.info('Closing exiftool process');
    await exiftool.end();
  }
}

async function processFile(file: Dirent, dryRun: boolean): Promise<void> {
  logger.info('Processing file "%s"', file.name);
  const filePath = join(file.parentPath, file.name);
  try {
    const metadata = await exiftool.read(filePath);
    const isIphone = IPHONE_MAKE.localeCompare(metadata.Make ?? '');

    if (!isIphone) {
      logger.debug(`Skipping non-iPhone file "${file.name}"`);
      return;
    }

    if (!metadata.CreateDate) {
      logger.warn('Skipping "%s", file has no creation date in metadata', file.name);
      return;
    }

    const fileCreationDate = new Date(metadata.CreateDate as string);
    const fileNameCreationDate = parseDateFromFileName(filePath);

    if (!fileNameCreationDate) {
      logger.warn('Skipping "%s", failed to parse creation date from file name', file.name);
      return;
    }

    if (fileNameCreationDate.getTime() === fileCreationDate.getTime()) {
      logger.debug(`Skipping "%s", No change required`, file.name);
      return;
    }

    const newFileName = getNewFilename(file, fileCreationDate);

    if (dryRun) {
      logger.warn('Update required, dry-run mode, from "%s" to "%s"', file.name, newFileName);
    } else {
      logger.trace([file.name, newFileName], 'Updating file name');
      await fs.rename(filePath, join(file.parentPath, getNewFilename(file, fileCreationDate)));
      logger.info('File name updated from "%s" to "%s"', file.name, newFileName);
    }
  } catch (error) {
    console.error([error, filePath], 'Error processing file');
  }
}

function parseDateFromFileName(filePath: string): Date | null {
  const regex = /(\d{4})(\d{2})(\d{2})_(\d{2})(\d{2})(\d{2})/;
  const match = regex.exec(filePath);
  if (match) {
    const [, year, month, day, hour, minute, second] = match;
    return new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`);
  }
  return null;
}

function getNewFilename(file: Dirent, date: Date): string {
  const yyyy = date.getFullYear();
  const MM = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');
  const formattedDate = `${yyyy}${MM}${dd}_${hh}${mm}${ss}`;
  const filenameSuffix = file.name.substring(formattedDate.length);
  return `${formattedDate}${filenameSuffix}`;
}
