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

import { handleErrorUnknown } from 'common/common.js';
import { getLogger } from 'common/logger.js';
import type { Dirent } from 'fs';
import * as fs from 'fs/promises';
import { join, basename, extname, dirname } from 'path';
import convertHeic from 'heic-convert';
import trash from 'trash';

const logger = getLogger('heic-to-jpeg-converter');

/**
 * Covert apple HEIC photos to JPEG format.
 * Use 0.92 quality to keep the quality high and size about the same.
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace HEICtoJpegConverter {
  export async function scan(folderPath: string): Promise<Dirent[]> {
    logger.debug('Scanning folder "%s"', folderPath);
    const heicPhotos: Dirent[] = [];
    const files = await fs.readdir(folderPath, { withFileTypes: true });
    for (const file of files) {
      const filePath = join(folderPath, file.name);
      if (file.isDirectory()) {
        const subFolder = await scan(filePath);
        heicPhotos.push(...subFolder);
      } else if (isHeicPhoto(file)) {
        heicPhotos.push(file);
      } else {
        logger.debug('Ignore "%s"', file.name);
      }
    }
    return heicPhotos;
  }

  function isHeicPhoto(file: Dirent): boolean {
    return file.isFile() && extname(file.name).toLowerCase() === '.heic';
  }

  export async function convert(srcPhoto: Dirent, dryRun: boolean): Promise<void> {
    let srcPhotoPath, outPhotoPath: string;
    try {
      logger.info('Convert "%s"', srcPhoto.name);
      srcPhotoPath = join(srcPhoto.parentPath, srcPhoto.name);
      outPhotoPath = join(dirname(srcPhotoPath), `${basename(srcPhoto.name, extname(srcPhoto.name))}.jpeg`);
      await convertToJPEG(srcPhotoPath, outPhotoPath);
      await deletePhoto(srcPhoto.name, srcPhotoPath, outPhotoPath, dryRun);
    } catch (error) {
      const err = handleErrorUnknown(error);
      throw new Error(`Error converting "${srcPhotoPath}": ${err.message}`, { cause: error });
    }
  }

  async function convertToJPEG(srcPhotoPath: string, outPhotoPath: string): Promise<void> {
    const inputStream = await fs.readFile(srcPhotoPath);
    const outputStream = await convertHeic({
      buffer: inputStream,
      format: 'JPEG',
      quality: 1,
    });
    await fs.writeFile(outPhotoPath, Buffer.from(outputStream));
  }

  async function deletePhoto(
    srcPhotoName: string,
    srcPhotoPath: string,
    outPhotoPath: string,
    dryRun: boolean,
  ): Promise<void> {
    if (dryRun) {
      logger.warn('Delete converted, for dry-run, "%s"', srcPhotoName);
      await trash(outPhotoPath);
    } else {
      logger.info('Delete "%s"', srcPhotoName);
      await trash(srcPhotoPath);
    }
  }
}
