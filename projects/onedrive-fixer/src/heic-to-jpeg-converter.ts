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
import { join, basename, extname } from 'path';
import sharp from 'sharp';
import decode from 'heic-decode';
import trash from 'trash';

const logger = getLogger('heic-to-jpeg-converter');

/**
 * Covert apple HEIC photos to JPEG format.
 * Use 0.92 quality to keep the quality high and size about the same.
 */
export class HEICtoJpegConverter {
  private readonly dryRun: boolean;
  private readonly convertedPhotos: string[] = [];
  private readonly failedPhotos = new Map<string, Error>();

  constructor(dryRun: boolean) {
    this.dryRun = dryRun;
  }

  static async convertFolder(
    folderPath: string,
    dryRun: boolean = true,
  ): Promise<{
    convertedPhotos: string[];
    failedPhotos: Map<string, Error>;
  }> {
    const converter = new HEICtoJpegConverter(dryRun);
    await converter.convertFolder(folderPath);
    return { convertedPhotos: converter.convertedPhotos, failedPhotos: converter.failedPhotos };
  }

  async convertFolder(folderPath: string): Promise<void> {
    logger.info('Convert folder "%s"', folderPath);
    const files = await fs.readdir(folderPath, { withFileTypes: true });
    for (const file of files) {
      if (file.isDirectory()) {
        await this.convertFolder(join(folderPath, file.name));
      } else if (file.isFile() && extname(file.name).toLowerCase() === '.heic') {
        await this.convertPhoto(file);
      }
    }
  }

  async convertPhoto(srcPhoto: Dirent): Promise<void> {
    let srcPhotoPath, outPhotoPath: string;
    try {
      srcPhotoPath = join(srcPhoto.parentPath, srcPhoto.name);
      outPhotoPath = join(
        srcPhoto.parentPath,
        `${basename(srcPhoto.name, extname(srcPhoto.name))}.jpeg`,
      );

      logger.info('Convert "%s"', srcPhoto.name);
      const inStream = await fs.readFile(srcPhotoPath);
      const heicImageData = await decode({ buffer: inStream });
      const sharpImage = sharp(heicImageData.data, {
        raw: {
          width: heicImageData.width,
          height: heicImageData.height,
          channels: 4,
        },
      });
      await sharpImage.jpeg({ quality: 92 }).toFile(outPhotoPath);

      // success
      this.convertedPhotos.push(outPhotoPath);

      if (this.dryRun) {
        logger.warn('Delete, for dry-run, "%s"', srcPhoto.name);
        await trash(outPhotoPath);
      } else {
        logger.info('Delete "%s"', srcPhoto.name);
        await trash(srcPhotoPath);
      }
    } catch (error) {
      logger.error(error, 'Error converting "%s"', srcPhoto.name);
      this.failedPhotos.set(srcPhoto.name, handleErrorUnknown(error));
    }
  }
}
