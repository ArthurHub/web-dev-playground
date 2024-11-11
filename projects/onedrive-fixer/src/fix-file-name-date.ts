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
import { join } from 'path';
import { exiftool } from 'exiftool-vendored';
import { getLogger } from 'common/logger.js';
import { iterateFiles, iterateFilesByExtensionFilter } from 'common/filesystem.js';

/**
 * The media files extensions supported by this script.
 */
const supportedExtensions = ['.heic', '.jpg', '.jpeg', '.png', '.mp4', '.mov'];

const logger = getLogger('fix-file-name-date');

export async function updateFileNames(folderPath: string): Promise<void> {
  try {
    await iterateFiles(folderPath, processFile, iterateFilesByExtensionFilter(supportedExtensions));
  } catch (error) {
    logger.fatal(error, 'Error updating file names:');
  }
}

async function processFile(file: Dirent): Promise<void> {
  const filePath = join(file.parentPath, file.name);
  try {
    const metadata = await exiftool.read(filePath);
    const isIphone = metadata.Make?.toLowerCase().includes('apple');

    if (isIphone && metadata.CreateDate) {
      const fileCreationDate = new Date(metadata.CreateDate as string);
      const fileNameCreationDate = parseDateFromFileName(filePath);

      if (fileNameCreationDate && fileNameCreationDate.getTime() !== fileCreationDate.getTime()) {
        await renameFile(filePath, fileCreationDate);
      }
    }
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
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

async function renameFile(filePath: string, creationDate: Date): Promise<void> {
  const folderPath = filePath.substring(0, filePath.lastIndexOf('/'));
  const fileExtension = filePath.substring(filePath.lastIndexOf('.'));
  const formattedDate = formatDateForFileName(creationDate);
  const newFileName = `${formattedDate}${fileExtension}`;
  const newFilePath = join(folderPath, newFileName);

  try {
    await fs.rename(filePath, newFilePath);
    console.log(`File renamed: ${filePath} -> ${newFilePath}`);
  } catch (error) {
    console.error(`Failed to rename ${filePath} to ${newFilePath}:`, error);
  }
}

function formatDateForFileName(date: Date): string {
  const yyyy = date.getFullYear();
  const MM = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');

  return `${yyyy}${MM}${dd}_${hh}${mm}${ss}`;
}
