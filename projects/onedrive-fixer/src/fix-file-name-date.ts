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

import { promises as fs } from 'fs';
import { join } from 'path';
import { exiftool, type Tags } from 'exiftool-vendored';
import { getLogger } from 'common/logger.js';

const supportedExtensions = ['.jpg', '.jpeg', '.png', '.mp4', '.mov'];

const logger = getLogger('fix-file-name-date');

export async function updateFileNames(folderPath: string) {
  try {
    await iterateFiles(folderPath);
  } catch (error) {
    logger.fatal(error, 'Error updating file names:');
  }
}

async function iterateFiles(folderPath: string) {
  const files = await fs.readdir(folderPath, { withFileTypes: true });

  for (const file of files) {
    const filePath = join(folderPath, file.name);
    if (file.isDirectory()) {
      await iterateFiles(filePath);
    } else if (isSupportedFile(file.name)) {
      await processFile(filePath);
    }
  }
}

function isSupportedFile(fileName: string): boolean {
  const ext = fileName.slice(fileName.lastIndexOf('.')).toLowerCase();
  return supportedExtensions.includes(ext);
}

async function processFile(filePath: string) {
  try {
    const metadata = (await exiftool.read(filePath)) as Tags;
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
  const match = filePath.match(regex);
  if (match) {
    const [, year, month, day, hour, minute, second] = match;
    return new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`);
  }
  return null;
}

async function renameFile(filePath: string, creationDate: Date) {
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
