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
import { OneDriveFixedFileStatus, type OneDriveFixedFile } from './entities.js';
import { compareIgnoreCase, getDateIgnoreTimezone } from 'common/common.js';

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
export class OneDriveNameDateFixer {
  private readonly dryRun: boolean;
  private readonly handledFiles: OneDriveFixedFile[] = [];

  constructor(dryRun: boolean) {
    this.dryRun = dryRun;
  }

  public static async updateFileNames(
    folderPath: string,
    dryRun: boolean,
  ): Promise<OneDriveFixedFile[]> {
    const fixer = new OneDriveNameDateFixer(dryRun);
    await fixer.updateFileNames(folderPath);
    return fixer.handledFiles;
  }

  async updateFileNames(folderPath: string): Promise<void> {
    try {
      logger.info('Starting file name update process in "%s"', resolve(folderPath));
      await this.iterateFiles(folderPath);
    } catch (error) {
      logger.fatal(error, 'Error updating file names:');
    } finally {
      logger.info('Closing exiftool process');
      await exiftool.end();
    }
  }

  async iterateFiles(folderPath: string): Promise<void> {
    const files = await fs.readdir(folderPath, { withFileTypes: true });

    for (const file of files) {
      const filePath = join(folderPath, file.name);
      if (file.isDirectory()) {
        logger.info('Processing folder "%s"', file.name);
        await this.iterateFiles(filePath);
      } else if (supportedExtensions.includes(extname(file.name).toLowerCase())) {
        await this.processFile(file);
      }
    }
  }

  async processFile(file: Dirent): Promise<void> {
    logger.debug('Processing file "%s"', file.name);
    const filePath = join(file.parentPath, file.name);
    try {
      const metadata = await exiftool.read(filePath);
      const isIphone = compareIgnoreCase(IPHONE_MAKE, metadata.Make);

      if (!isIphone) {
        this.handledFiles.push({ file, status: OneDriveFixedFileStatus.SkippedNotIPhone });
        logger.debug(`Skipping non-iPhone file "${file.name}"`);
        return;
      }

      if (!metadata.CreateDate) {
        this.handledFiles.push({ file, status: OneDriveFixedFileStatus.SkippedDateUnknown });
        logger.warn('Skipping "%s", file has no creation date in metadata', file.name);
        return;
      }

      const fileCreationDate = getDateIgnoreTimezone(metadata.CreateDate.toString());
      const fileNameCreationDate = this.parseDateFromFileName(filePath);

      if (!fileNameCreationDate) {
        this.handledFiles.push({ file, status: OneDriveFixedFileStatus.SkippedDateUnknown });
        logger.warn('Skipping "%s", failed to parse creation date from file name', file.name);
        return;
      }

      if (fileNameCreationDate.getTime() === fileCreationDate.getTime()) {
        this.handledFiles.push({ file, status: OneDriveFixedFileStatus.NoUpdateRequired });
        logger.debug(`Skipping "%s", No change required`, file.name);
        return;
      }

      const newFileName = this.getNewFilename(file, fileCreationDate);

      if (this.dryRun) {
        logger.warn('Update required, dry-run mode: "%s" --> "%s"', file.name, newFileName);
      } else {
        logger.trace([file.name, newFileName], 'Updating file name');
        await fs.rename(
          filePath,
          join(file.parentPath, this.getNewFilename(file, fileCreationDate)),
        );
        logger.info('File name updated: "%s" --> "%s"', file.name, newFileName);
      }
      this.handledFiles.push({
        file,
        status: OneDriveFixedFileStatus.Updated,
        updateName: newFileName,
      });
    } catch (error) {
      this.handledFiles.push({ file, status: OneDriveFixedFileStatus.Error, error });
      console.error([error, filePath], 'Error processing file %s', file.name);
    }
  }

  parseDateFromFileName(filePath: string): Date | null {
    const regex = /(\d{4})(\d{2})(\d{2})_(\d{2})(\d{2})(\d{2})/;
    const match = regex.exec(filePath);
    if (match) {
      const [, year, month, day, hour, minute, second] = match;
      return new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`);
    }
    return null;
  }

  getNewFilename(file: Dirent, date: Date): string {
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
}
