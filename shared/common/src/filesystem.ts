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

import { Dirent, promises as fs } from 'fs';
import { join, extname } from 'path';

/**
 * Iterate over the files in a folder and apply a function to each file.
 * @param folderPath the path to the folder to iterate
 * @param applyFn the function to apply to each file
 * @param filterFn the function to filter the files
 */
export async function iterateFiles(
  folderPath: string,
  applyFn: (file: Dirent) => Promise<void>,
  filterFn?: (file: Dirent) => boolean,
): Promise<void> {
  const files = await fs.readdir(folderPath, { withFileTypes: true });

  for (const file of files) {
    const filePath = join(folderPath, file.name);
    if (file.isDirectory()) {
      await iterateFiles(filePath, applyFn, filterFn);
    } else if (!filterFn || filterFn(file)) {
      await applyFn(file);
    }
  }
}

/**
 * Get a filter function to include files by extension.
 * @param extension the extension to include
 */
export function iterateFilesByExtensionFilter(extension: string[]): (file: Dirent) => boolean {
  return (file: Dirent): boolean => extension.includes(extname(file.name));
}
