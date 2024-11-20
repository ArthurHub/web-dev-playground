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

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { promises as fs } from 'fs';
import { exiftool } from 'exiftool-vendored';
import { OneDriveNameDateFixer } from '../src/onedrive-name-date-fixer.js';
import { OneDriveFileToFixStatus } from '../src/entities.js';

/* eslint-disable @typescript-eslint/no-deprecated */

describe('OneDriveNameDateFixer', () => {
  const folderPath = '/test-folder';
  const file = {
    name: '20220101_120000.jpg',
    parentPath: folderPath,
    isDirectory: (): boolean => false,
  };
  const metadata = { Make: 'apple', CreateDate: '2022-01-01T12:00:00' };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should update file names correctly', async () => {
    fs.readdir = vi.fn().mockResolvedValue([file]);
    exiftool.read = vi.fn().mockResolvedValue(metadata);

    const handledFiles = await OneDriveNameDateFixer.scan(folderPath, vi.fn());
    await OneDriveNameDateFixer.fix(handledFiles, false, vi.fn());

    expect(handledFiles).toHaveLength(1);
    expect(handledFiles[0]?.status).toBe(OneDriveFileToFixStatus.NoUpdateRequired);
  });

  it('should skip non-iPhone files', async () => {
    fs.readdir = vi.fn().mockResolvedValue([file]);
    exiftool.read = vi.fn().mockResolvedValue({ ...metadata, Make: 'samsung' });

    const handledFiles = await OneDriveNameDateFixer.scan(folderPath, vi.fn());
    await OneDriveNameDateFixer.fix(handledFiles, false, vi.fn());

    expect(handledFiles).toHaveLength(1);
    expect(handledFiles[0]?.status).toBe(OneDriveFileToFixStatus.SkippedNotIPhone);
  });

  it('should skip files with unknown creation date', async () => {
    fs.readdir = vi.fn().mockResolvedValue([file]);
    exiftool.read = vi.fn().mockResolvedValue({ ...metadata, CreateDate: undefined });

    const handledFiles = await OneDriveNameDateFixer.scan(folderPath, vi.fn());
    await OneDriveNameDateFixer.fix(handledFiles, false, vi.fn());

    expect(handledFiles).toHaveLength(1);
    expect(handledFiles[0]?.status).toBe(OneDriveFileToFixStatus.SkippedDateUnknown);
  });

  it('should rename files if dates do not match', async () => {
    fs.rename = vi.fn();
    fs.readdir = vi.fn().mockResolvedValue([file]);
    exiftool.read = vi.fn().mockResolvedValue({ ...metadata, CreateDate: '2022-01-01T13:00:00' });

    const handledFiles = await OneDriveNameDateFixer.scan(folderPath, vi.fn());
    await OneDriveNameDateFixer.fix(handledFiles, false, vi.fn());

    expect(handledFiles).toHaveLength(1);
    expect(handledFiles[0]?.status).toBe(OneDriveFileToFixStatus.UpdateComplete);
    expect(fs.rename).toHaveBeenCalled();
  });

  it('should not rename files in dry-run mode', async () => {
    fs.rename = vi.fn();
    fs.readdir = vi.fn().mockResolvedValue([file]);
    exiftool.read = vi.fn().mockResolvedValue({ ...metadata, CreateDate: '2022-01-01T13:00:00' });

    const handledFiles = await OneDriveNameDateFixer.scan(folderPath, vi.fn());
    await OneDriveNameDateFixer.fix(handledFiles, true, vi.fn());

    expect(handledFiles).toHaveLength(1);
    expect(handledFiles[0]?.status).toBe(OneDriveFileToFixStatus.UpdateComplete);
    expect(fs.rename).not.toHaveBeenCalled();
  });
});
