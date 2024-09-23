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
    throw new Error(`Invalid URL: ${urlStr}. Error: ${error}`);
  }
}

async function main(): Promise<void> {
  const folderPath = '/Stuff/github/the-art-of-dev/blog/posts';

  console.log('Run extractImageSources...');
  const images = await extractImageSources(folderPath);

  console.log(`Extracted ${images.length} images`);
  console.log(images[0]);

  const outputFolder = '/Stuff/github/the-art-of-dev/blog/resources';
  // Ensure the output directory exists
  await promises.mkdir(outputFolder, { recursive: true });

  const fixedImages = images.map((image) => {
    // Handle query parameters in URLs (e.g., ?version=1.2)
    const fixedUrl = fixUrl(image.source.split('?')[0]!);
    const outputPath = path.join(outputFolder, path.basename(fixedUrl));
    return {
      ...image,
      fixedSource: fixedUrl,
      output: outputPath,
    };
  });

  await downloadAllImages(
    fixedImages.map((img) => {
      return { in: img.fixedSource, out: img.output };
    }),
  );

  console.log('Images downloaded successfully');
}

main();
