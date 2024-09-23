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

import { extractImageSources } from './image-source-extractor.js';

async function main(): Promise<void> {
  const folderPath = '/Stuff/github/the-art-of-dev/blog/posts';

  console.log('Run extractImageSources...');
  const images = await extractImageSources(folderPath);

  console.log(`Extracted ${images.length} images`);
  console.log(images[0]);
}

main();
