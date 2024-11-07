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
import { updateBlogImages } from './image-source-updater.js';

async function main(): Promise<void> {
  try {
    const blogPostFolder = '/Stuff/github/testing-blog-transfer/blog/posts';
    const imagesResourceFolder = '/Stuff/github/testing-blog-transfer/blog/resources';
    await updateBlogImages(blogPostFolder, imagesResourceFolder, {
      downloadImages: true,
      writeChanges: false,
    });
  } catch (ex) {
    const error = handleErrorUnknown(ex);
    console.error(`Failed toplevel execution: ${error}`);
    throw error;
  }
}

void main();
