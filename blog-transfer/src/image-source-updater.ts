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
import { extractImageSources, ImageInfo } from './image-source-extractor.js';
import { getFriendlyError } from '..//../libs/common/src/common.js';

interface ImageInfoExt extends ImageInfo {
  fixedSource: string;
  newSource: string;
  output: string;
}

export async function updateBlogImages(): Promise<void> {
  const blogPostFolder = '/Stuff/github/the-art-of-dev/blog/posts';
  const imagesResourceFolder = '/Stuff/github/the-art-of-dev/blog/resources';
  await updateBlogImagesImpl(blogPostFolder, imagesResourceFolder);
}

async function updateBlogImagesImpl(
  blogPostFolder: string,
  imagesResourceFolder: string,
): Promise<void> {
  console.log('Run extractImageSources...');
  const images = await extractImageSources(blogPostFolder);

  console.log(`Extracted ${images.length} images`);
  console.log(images[0]);

  // Ensure the output directory exists
  await promises.mkdir(imagesResourceFolder, { recursive: true });

  const imagesExt = fixImagesSource(images, imagesResourceFolder);

  await downloadAllImages(
    imagesExt.map((img) => {
      return { in: img.fixedSource, out: img.output };
    }),
  );

  const fileCount = await promises.readdir(imagesResourceFolder);
  console.log(`Images downloaded successfully, files: ${fileCount.length}`);

  await updateImageSourceInMarkdown(imagesExt);
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
    throw new Error(`Invalid URL: ${urlStr}. Error: ${getFriendlyError(error)}`);
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
      console.log(`Updated ${filePath}`);
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
