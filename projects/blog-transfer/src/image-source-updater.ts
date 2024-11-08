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

import { promises } from 'fs';
import * as path from 'path';
import { downloadAllImages } from './image-downloader.js';
import { extractImageSources, type ImageInfo } from './image-source-extractor.js';
import { handleErrorUnknown } from 'common/common.js';
import { getLogger } from 'common/logger.js';

const logger = getLogger('image-source-updater');

interface ImageInfoExt extends ImageInfo {
  fixedSource: string;
  newSource: string;
  output: string;
}

export async function updateBlogImages(
  blogPostFolder: string,
  imagesResourceFolder: string,
  options: {
    downloadImages?: boolean;
    writeChanges?: boolean;
  } = {
    downloadImages: true,
    writeChanges: false,
  },
): Promise<void> {
  logger.info('Run extractImageSources...');
  const images = await extractImageSources(blogPostFolder);

  logger.info(`Extracted ${images.length} images`);
  logger.debug(images[0]);

  // Ensure the output directory exists
  await promises.mkdir(imagesResourceFolder, { recursive: true });

  const imagesExt = fixImagesSource(images, imagesResourceFolder);

  if (options.downloadImages) {
    await downloadAllImages(
      imagesExt.map((img) => {
        return { in: img.fixedSource, out: img.output };
      }),
    );

    const fileCount = await promises.readdir(imagesResourceFolder);
    logger.info(`Images downloaded successfully, files: ${fileCount.length}`);
  } else {
    logger.warn('Download images skipped due to downloadImages option');
  }

  if (options.writeChanges) {
    await updateImageSourceInMarkdown(imagesExt);
  } else {
    logger.warn('Update markdown files skipped due to writeChanges option');
  }
}

// Handle URLs that have some extra name at the end
function fixUrl(urlStr: string): string {
  try {
    urlStr = urlStr.trim();
    if (urlStr.endsWith("'")) {
      const endOfProperUrl = urlStr.lastIndexOf("'", urlStr.length - 2) - 1;
      if (endOfProperUrl >= 0 && urlStr.charAt(endOfProperUrl) === ' ') {
        return urlStr.slice(0, endOfProperUrl);
      }
    }
    return urlStr;
  } catch (error) {
    throw new Error(`Invalid URL: ${urlStr}. Error: ${handleErrorUnknown(error)}`);
  }
}

// fix image source to remove extra parts and create output path with correct file name
function fixImagesSource(images: ImageInfo[], outputFolder: string): ImageInfoExt[] {
  return images.map((image) => {
    // Handle query parameters in URLs (e.g., ?version=1.2)
    const fixedUrl = fixUrl(image.source.split('?')[0] ?? '');
    const fileName = `${getYearMonthPrefix(fixedUrl)}-${path.basename(fixedUrl)}`;
    const newSource = `../resources/${fileName}`;
    const outputPath = path.join(outputFolder, fileName);
    return {
      ...image,
      fixedSource: fixedUrl,
      newSource: newSource,
      output: outputPath,
    };
  });
}

function getYearMonthPrefix(url: string): string {
  const uploadsIndex = url.indexOf('/20');
  if (uploadsIndex === -1) {
    throw new Error(`Failed to find year in URL: ${url}`);
  }
  const yearEndIdx = url.indexOf('/', uploadsIndex + 1);
  if (yearEndIdx === -1) {
    throw new Error(`Failed to find year in URL: ${url}`);
  }
  const year = url.substring(uploadsIndex + 1, yearEndIdx);
  const monthEndIdx = url.indexOf('/', yearEndIdx + 1);
  if (yearEndIdx === -1) {
    throw new Error(`Failed to find month in URL: ${url}`);
  }
  return `${year}-${url.substring(yearEndIdx + 1, monthEndIdx)}`;
}

async function updateImageSourceInMarkdown(images: ImageInfoExt[]): Promise<void> {
  const imagesByFilePath = groupImagesByFile(images);

  await Promise.all(
    Array.from(imagesByFilePath.entries()).map(async ([filePath, images]) => {
      await updateSourceInFile(filePath, images);
      logger.debug(`Updated ${filePath}`);
    }),
  );
}

// Group the given array of images by the filePath in the object to a list of images in that file
function groupImagesByFile(images: ImageInfoExt[]): Map<string, ImageInfoExt[]> {
  return images.reduce((map, image) => {
    if (!map.has(image.filePath)) {
      map.set(image.filePath, []);
    }
    map.get(image.filePath)?.push(image);
    return map;
  }, new Map<string, ImageInfoExt[]>());
}

// update the file content by replacing old source with new source and then writing it back to the file
async function updateSourceInFile(filePath: string, images: ImageInfoExt[]): Promise<void> {
  const fileContent = await promises.readFile(filePath, 'utf-8');
  let newContent = fileContent;
  for (const image of images) {
    newContent = newContent.replaceAll(image.source, image.newSource);
    newContent = newContent.replaceAll(image.fixedSource, image.newSource);
  }
  await promises.writeFile(filePath, newContent, 'utf-8');
}
