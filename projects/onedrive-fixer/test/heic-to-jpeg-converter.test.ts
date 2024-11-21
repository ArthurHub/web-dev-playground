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

import { describe, it, expect, vi, type Mock, beforeEach } from 'vitest';
import * as fs from 'fs/promises';
import { HEICtoJpegConverter } from '../src/heic-to-jpeg-converter.js';
import convert from 'heic-convert';
import trash from 'trash';
import { join } from 'path';
import type { Dirent } from 'fs';

vi.mock('fs/promises');
vi.mock('heic-convert');
vi.mock('trash');

describe('HEICtoJpegConverter', () => {
  const createDirent = (name: string, isFile: boolean): Dirent =>
    ({
      name,
      isFile: () => isFile,
      isDirectory: () => !isFile,
      parentPath: '/test-folder',
    } as Dirent);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should scan a folder and return all HEIC files', async () => {
    const folderPath = '/test-folder';
    const dirents: Dirent[] = [
      createDirent('photo1.heic', true),
      createDirent('photo2.jpg', true),
      createDirent('subfolder', false),
    ];
    const subDirents: Dirent[] = [createDirent('photo3.heic', true)];

    (fs.readdir as Mock).mockResolvedValueOnce(dirents).mockResolvedValueOnce(subDirents);

    const heicFiles = await HEICtoJpegConverter.scan(folderPath);

    expect(heicFiles).toHaveLength(2);
    expect(heicFiles.map((f) => f.name)).toEqual(['photo1.heic', 'photo3.heic']);
  });

  it('should convert a HEIC photo to JPEG and delete the original', async () => {
    const dirent = createDirent('photo1.heic', true);
    dirent.parentPath = '/test-folder';
    const srcPhotoPath = join(dirent.parentPath, dirent.name);
    const outPhotoPath = join(dirent.parentPath, 'photo1.jpeg');

    (fs.readFile as Mock).mockResolvedValue(Buffer.from('input data'));
    (fs.writeFile as Mock).mockResolvedValue(undefined);
    (convert as unknown as Mock).mockResolvedValue(Buffer.from('output data'));
    (trash as Mock).mockResolvedValue(undefined);

    await HEICtoJpegConverter.convert(dirent, false);

    expect(fs.readFile).toHaveBeenCalledWith(srcPhotoPath);
    expect(fs.writeFile).toHaveBeenCalledWith(outPhotoPath, Buffer.from('output data'));
    expect(convert).toHaveBeenCalledWith({ buffer: Buffer.from('input data'), format: 'JPEG', quality: 1 });
    expect(trash).toHaveBeenCalledWith(srcPhotoPath);
  });

  it('should perform a dry-run and delete the converted file instead of the original', async () => {
    const dirent = createDirent('photo1.heic', true);
    dirent.parentPath = '/test-folder';
    const srcPhotoPath = join(dirent.parentPath, dirent.name);
    const outPhotoPath = join(dirent.parentPath, 'photo1.jpeg');

    (fs.readFile as Mock).mockResolvedValue(Buffer.from('input data'));
    (fs.writeFile as Mock).mockResolvedValue(undefined);
    (convert as unknown as Mock).mockResolvedValue(Buffer.from('output data'));
    (trash as Mock).mockResolvedValue(undefined);

    await HEICtoJpegConverter.convert(dirent, true);

    expect(fs.readFile).toHaveBeenCalledWith(srcPhotoPath);
    expect(convert).toHaveBeenCalledWith({ buffer: Buffer.from('input data'), format: 'JPEG', quality: 1 });
    expect(fs.writeFile).toHaveBeenCalledWith(outPhotoPath, Buffer.from('output data'));
    expect(trash).toHaveBeenCalledWith(outPhotoPath);
  });
});
