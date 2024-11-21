// Therefore those skilled at the unorthodox
// are infinite as heaven and earth,
// inexhaustible as the great rivers.
// When they come to an end,
// they begin again,
// like the days and months;
// they die and are reborn,
// like the four seasons.
//
// * Sun Tsu, The Art of War.
//
// ArthurHub, 2024

import { Dirent, promises as fs } from 'fs';
import { extname, join, resolve } from 'path';
import { exiftool } from 'exiftool-vendored';
import { getLogger } from 'common/logger.js';
import { OneDriveFileToFixStatus, type OneDriveFileToFix } from './entities.js';
import { compareIgnoreCase, getDateIgnoreTimezone, handleErrorUnknown } from 'common/common.js';

const logger = getLogger('name-date-fixer');

/** The media files extensions supported by this script. */
const supportedExtensions = ['.heic', '.jpg', '.jpeg', '.png', '.mp4', '.mov'];

const IPHONE_MAKE = 'apple';

/**
 * A class to fix the file names of media files uploaded to OneDrive from iPhones.
 * OneDrive uses UTC timezone instead of local when uploading files.
 * Flow:
 * given a path to a folder
 * go over all the files in the folder hierarchy (deep)
 * for each image or video file read the file metadata
 * if the file metadata indicate that the image/video was taken on an iphone do:
 * read the date the file was created
 * parse the data of the file creation from the name of the file
 * compare the two
 * if they are different: update the name of the file with the correct date
 * date format in the file name is: yyyyMMdd_hhmmss
 *
 * Timezone handling:
 * JS forces use of local timezone when creating a Date object.
 * The parsed date in the file name doesn't contain timezone so it's fine.
 * When loading date from exif metadata, it will be adjusted to the local timezone from the
 * timezone in the metadata. We don't want it as we want the two to match.
 * The easiest is to remove the timezone info from exif metadata date before loading it into a Date object.
 * Then we can compare the two dates in current local timezone with same result as if we compared them original timezone.
 */

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace OneDriveNameDateFixer {
  export async function scan(
    folderPath: string,
    progressCallback: (folder: string, files: OneDriveFileToFix[]) => void,
  ): Promise<OneDriveFileToFix[]> {
    try {
      logger.info('Scan for media files to fix in "%s"', resolve(folderPath));
      const mediaFiles = await iterateFolderDeep(folderPath, progressCallback);
      logger.info('Scan complete, found "%d" media files', mediaFiles.length);
      return mediaFiles;
    } catch (error) {
      const err = handleErrorUnknown(error);
      throw new Error(`Error scanning folder "${folderPath}": ${err.message}`, { cause: err });
    } finally {
      try {
        logger.info('Closing exiftool process');
        await exiftool.closeChildProcesses();
      } catch (error) {
        // swallow the error
        logger.error(error, 'Error closing exiftool process');
      }
    }
  }

  export async function fix(
    files: OneDriveFileToFix[],
    dryRun: boolean,
    progressCallback: (index: number, total: number, file: OneDriveFileToFix) => void,
  ): Promise<void> {
    try {
      files = files.filter((file) => file.status === OneDriveFileToFixStatus.UpdateRequired && file.newName);
      logger.info('Fix media file names for %d files', files.length);
      let index = 0;
      for (const file of files) {
        try {
          await renameFile(file, dryRun);
        } catch (error) {
          logger.error(error, 'Error updating file name "%s"', file.file.name);
        }
        progressCallback(++index, files.length, file);
      }
    } catch (error) {
      logger.fatal(error, 'Error updating file names');
    }
  }

  async function iterateFolderDeep(
    folderPath: string,
    progressCallback: (folder: string, files: OneDriveFileToFix[]) => void,
  ): Promise<OneDriveFileToFix[]> {
    let mediaFiles: OneDriveFileToFix[] = [];

    const dirFiles = await fs.readdir(folderPath, { withFileTypes: true });
    for (const file of dirFiles) {
      const filePath = join(folderPath, file.name);
      if (file.isDirectory()) {
        logger.info('Processing folder "%s"', file.name);
        mediaFiles = mediaFiles.concat(await iterateFolderDeep(filePath, progressCallback));
      } else if (supportedExtensions.includes(extname(file.name).toLowerCase())) {
        mediaFiles.push(await processFile(file));
      }
    }

    progressCallback(folderPath, mediaFiles);
    return mediaFiles;
  }

  async function processFile(file: Dirent): Promise<OneDriveFileToFix> {
    logger.debug('Processing file "%s"', file.name);
    const filePath = join(file.parentPath, file.name);
    try {
      const metadata = await exiftool.read(filePath);
      const isIphone = compareIgnoreCase(IPHONE_MAKE, metadata.Make);

      if (!isIphone) {
        return { file: file, status: OneDriveFileToFixStatus.SkippedNotIPhone };
      }

      if (!metadata.CreateDate) {
        return { file: file, status: OneDriveFileToFixStatus.SkippedDateUnknown };
      }

      const fileNameCreationDate = parseDateFromFileName(filePath);
      if (!fileNameCreationDate) {
        return { file, status: OneDriveFileToFixStatus.SkippedDateUnknown };
      }

      const fileCreationDate = getDateIgnoreTimezone(metadata.CreateDate.toString());
      if (fileNameCreationDate.getTime() === fileCreationDate.getTime()) {
        return { file, status: OneDriveFileToFixStatus.NoUpdateRequired };
      }

      return {
        file: file,
        status: OneDriveFileToFixStatus.UpdateRequired,
        newName: getNewFilename(file, fileCreationDate),
      };
    } catch (error) {
      console.error([error, filePath], 'Error processing file %s', file.name);
      return { file: file, status: OneDriveFileToFixStatus.Error, error };
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

  async function renameFile(file: OneDriveFileToFix, dryRun: boolean): Promise<void> {
    try {
      if (file.status !== OneDriveFileToFixStatus.UpdateRequired) {
        throw new Error(`Media file object "${file.file.name}" invalid status for update: "${file.status}"`);
      }
      if (file.newName === undefined) {
        throw new Error(`Invalid media file object "${file.file.name}" for update, new name is undefined`);
      }

      if (dryRun) {
        logger.warn('Renaming in dry-run mode: "%s" --> "%s"', file.file.name, file.newName);
        return;
      }

      logger.trace([file.file.name, file.newName], 'Updating file name');
      await fs.rename(join(file.file.parentPath, file.file.name), join(file.file.parentPath, file.newName));
      file.status = OneDriveFileToFixStatus.UpdateComplete;
      logger.info('File renamed: "%s" --> "%s"', file.file.name, file.newName);
    } catch (error) {
      logger.error(error, 'Error renaming file "%s"', file.file.name);
      file.error = error;
    }
  }
}
