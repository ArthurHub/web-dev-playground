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

import os from 'node:os';
import process from 'node:process';
import { Dirent, promises as fs } from 'fs';
import { join, extname } from 'path';
import { randomUUID } from 'node:crypto';

export async function pathExists(path: string): Promise<boolean> {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

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

export function pathKey(
  options: { env: NodeJS.ProcessEnv; platform: NodeJS.Platform } = { env: process.env, platform: process.platform },
): string {
  if (options.platform !== 'win32') {
    return 'PATH';
  }
  return (
    Object.keys(options.env)
      .reverse()
      .find((key) => key.toUpperCase() === 'PATH') ?? 'Path'
  );
}

/**
 * The os.tmpdir() built-in doesn't return the real path. That can cause problems
 * when the returned path is a symlink, which is the case on macOS.
 */
export async function tempDir(): Promise<string> {
  return await fs.realpath(os.tmpdir());
}

export async function tempfile(extension?: string): Promise<string> {
  extension = extension ? (extension.startsWith('.') ? extension : `.${extension}`) : '';
  return join(await tempDir(), randomUUID() + extension);
}
