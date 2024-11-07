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

/**
 * Functions to download a list of images to a specified folder, preserving the file names.
 * The functions ensure that images are downloaded asynchronously and avoid re-downloading
 * images that already exist in the target folder.
 */

import * as fs from 'fs';
import * as https from 'https';
import * as http from 'http';
import { URL } from 'url';
import { handleErrorUnknown } from 'common/common.js';

export interface DownloadInfo {
  in: string;
  out: string;
}

export async function downloadAllImages(images: DownloadInfo[]): Promise<void> {
  const downloadPromises = images.map((image) => downloadImage(image));
  await Promise.all(downloadPromises);
}

async function downloadImage(imageSource: DownloadInfo): Promise<void> {
  // Check if the image already exists
  if (fs.existsSync(imageSource.out)) {
    console.log(`Image already exists: ${imageSource.out}`);
    return;
  }

  // Determine if the source is a URL
  await downloadFromUrl(imageSource.in, imageSource.out);
}

async function downloadFromUrl(urlStr: string, outputPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const urlObj = getUrl(urlStr);
    const protocol = urlObj.protocol === 'https:' ? https : http;

    protocol
      .get(urlStr, (response) => {
        if (response.statusCode && response.statusCode >= 200 && response.statusCode < 300) {
          const fileStream = fs.createWriteStream(outputPath);
          response.pipe(fileStream);

          fileStream.on('finish', () => {
            fileStream.close();
            console.log(`Downloaded image: ${outputPath}`);
            resolve();
          });
        } else if (
          response.statusCode &&
          response.statusCode >= 300 &&
          response.statusCode < 400 &&
          response.headers.location
        ) {
          // Handle redirects
          // eslint-disable-next-line @typescript-eslint/use-unknown-in-catch-callback-variable
          downloadFromUrl(response.headers.location, outputPath).then(resolve).catch(reject);
        } else {
          reject(
            new Error(
              `Failed to download image: ${urlObj.toString()}, Status code: ${response.statusCode}`,
            ),
          );
        }
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}

function getUrl(urlStr: string): URL {
  try {
    return new URL(urlStr);
  } catch (error) {
    throw new Error(`Invalid URL: ${urlStr}. Error: ${handleErrorUnknown(error)}`);
  }
}
