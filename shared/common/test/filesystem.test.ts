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

import { describe, it, expect, vi } from 'vitest';
import { Dirent, promises as fs } from 'fs';
import { iterateFiles, iterateFilesByExtensionFilter } from '../src/filesystem.js';

describe('iterateFiles', () => {
  it('should apply the function to each file in the directory', async () => {
    const mockFiles: Dirent[] = [
      { name: 'file1.txt', isDirectory: () => false } as Dirent,
      { name: 'file2.txt', isDirectory: () => false } as Dirent,
      { name: 'subfolder', isDirectory: () => true } as Dirent,
    ];
    const mockSubFiles: Dirent[] = [{ name: 'file3.txt', isDirectory: () => false } as Dirent];

    fs.readdir = vi.fn().mockResolvedValueOnce(mockFiles).mockResolvedValueOnce(mockSubFiles);

    const applyFn = vi.fn();
    await iterateFiles('mock_folder', applyFn);

    expect(applyFn).toHaveBeenCalledTimes(3);
    expect(applyFn).toHaveBeenCalledWith(mockFiles[0]);
    expect(applyFn).toHaveBeenCalledWith(mockFiles[1]);
    expect(applyFn).toHaveBeenCalledWith(mockSubFiles[0]);
  });

  it('should apply the filter function to each file in the directory', async () => {
    const mockFiles: Dirent[] = [
      { name: 'file1.txt', isDirectory: () => false } as Dirent,
      { name: 'file2.txt', isDirectory: () => false } as Dirent,
      { name: 'subfolder', isDirectory: () => true } as Dirent,
    ];
    const mockSubFiles: Dirent[] = [{ name: 'file3.txt', isDirectory: () => false } as Dirent];

    fs.readdir = vi.fn().mockResolvedValueOnce(mockFiles).mockResolvedValueOnce(mockSubFiles);

    const applyFn = vi.fn();
    const filterFn = vi.fn((file: Dirent) => file.name.endsWith('.txt'));
    await iterateFiles('mock_folder', applyFn, filterFn);

    expect(applyFn).toHaveBeenCalledTimes(3);
    expect(applyFn).toHaveBeenCalledWith(mockFiles[0]);
    expect(applyFn).toHaveBeenCalledWith(mockFiles[1]);
    expect(applyFn).toHaveBeenCalledWith(mockSubFiles[0]);
    expect(filterFn).toHaveBeenCalledTimes(3);
    expect(filterFn).toHaveBeenCalledWith(mockFiles[0]);
    expect(filterFn).toHaveBeenCalledWith(mockFiles[1]);
    expect(filterFn).toHaveBeenCalledWith(mockSubFiles[0]);
  });

  it('should not apply the function to files that do not pass the filter', async () => {
    const mockFiles: Dirent[] = [
      { name: 'file1.txt', isDirectory: () => false } as Dirent,
      { name: 'file2.jpg', isDirectory: () => false } as Dirent,
      { name: 'subfolder', isDirectory: () => true } as Dirent,
    ];
    const mockSubFiles: Dirent[] = [{ name: 'file3.txt', isDirectory: () => false } as Dirent];

    fs.readdir = vi.fn().mockResolvedValueOnce(mockFiles).mockResolvedValueOnce(mockSubFiles);

    const applyFn = vi.fn();
    const filterFn = vi.fn((file: Dirent) => file.name.endsWith('.txt'));
    await iterateFiles('mock_folder', applyFn, filterFn);

    expect(applyFn).toHaveBeenCalledTimes(2);
    expect(applyFn).toHaveBeenCalledWith(mockFiles[0]);
    expect(applyFn).toHaveBeenCalledWith(mockSubFiles[0]);
    expect(filterFn).toHaveBeenCalledTimes(3);
    expect(filterFn).toHaveBeenCalledWith(mockFiles[0]);
    expect(filterFn).toHaveBeenCalledWith(mockFiles[1]);
    expect(filterFn).toHaveBeenCalledWith(mockSubFiles[0]);
  });
});

describe('iterateFilesByExtensionFilter', () => {
  it('should return a filter function that includes files by extension', () => {
    const filterFn = iterateFilesByExtensionFilter(['.txt', '.jpg']);

    const file1 = { name: 'file1.txt' } as Dirent;
    const file2 = { name: 'file2.jpg' } as Dirent;
    const file3 = { name: 'file3.png' } as Dirent;

    expect(filterFn(file1)).toBe(true);
    expect(filterFn(file2)).toBe(true);
    expect(filterFn(file3)).toBe(false);
  });
});
