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

import { getFriendlyError } from '../../libs/common/src/common.js';
import { updateBlogImages } from './image-source-updater.js';

async function main(): Promise<void> {
  try {
    await updateBlogImages();
  } catch (error) {
    console.error(`Failed toplevel execution: ${getFriendlyError(error)}`);
    throw error;
  }
}

void main();
