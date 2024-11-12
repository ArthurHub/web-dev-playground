import { describe, it, expect, vi, beforeEach } from 'vitest';
import { promises as fs } from 'fs';
import { exiftool } from 'exiftool-vendored';
import { OneDriveNameDateFixer } from '../src/onedrive-name-date-fixer.js';
import { OneDriveFixedFileStatus } from '../src/entities.js';

vi.mock('fs', () => ({
  promises: {
    readdir: vi.fn(),
    rename: vi.fn(),
  },
}));

vi.mock('exiftool-vendored', () => ({
  exiftool: {
    read: vi.fn(),
    end: vi.fn(),
  },
}));

vi.mock('common/logger.js', () => ({
  getLogger: vi.fn(() => ({
    info: vi.fn(),
    fatal: vi.fn(),
    debug: vi.fn(),
    warn: vi.fn(),
    trace: vi.fn(),
  })),
}));

describe('OneDriveNameDateFixer', () => {
  const folderPath = '/test-folder';
  const file = {
    name: '20220101_120000.jpg',
    parentPath: folderPath,
    isDirectory: (): boolean => false,
  };
  const filePath = `${folderPath}/${file.name}`;
  const metadata = { Make: 'apple', CreateDate: '2022-01-01T12:00:00' };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should update file names correctly', async () => {
    (fs.readdir as any).mockResolvedValue([file]);
    (exiftool.read as any).mockResolvedValue(metadata);

    const handledFiles = await OneDriveNameDateFixer.updateFileNames(folderPath, false);

    expect(handledFiles).toHaveLength(1);
    expect(handledFiles[0]?.status).toBe(OneDriveFixedFileStatus.NoUpdateRequired);
  });

  it('should skip non-iPhone files', async () => {
    (fs.readdir as any).mockResolvedValue([file]);
    (exiftool.read as any).mockResolvedValue({ ...metadata, Make: 'samsung' });

    const handledFiles = await OneDriveNameDateFixer.updateFileNames(folderPath, false);

    expect(handledFiles).toHaveLength(1);
    expect(handledFiles[0]?.status).toBe(OneDriveFixedFileStatus.SkippedNotIPhone);
  });

  it('should skip files with unknown creation date', async () => {
    (fs.readdir as any).mockResolvedValue([file]);
    (exiftool.read as any).mockResolvedValue({ ...metadata, CreateDate: undefined });

    const handledFiles = await OneDriveNameDateFixer.updateFileNames(folderPath, false);

    expect(handledFiles).toHaveLength(1);
    expect(handledFiles[0]?.status).toBe(OneDriveFixedFileStatus.SkippedDateUnknown);
  });

  it('should rename files if dates do not match', async () => {
    (fs.readdir as any).mockResolvedValue([file]);
    (exiftool.read as any).mockResolvedValue({ ...metadata, CreateDate: '2022-01-01T13:00:00' });

    const handledFiles = await OneDriveNameDateFixer.updateFileNames(folderPath, false);

    expect(handledFiles).toHaveLength(1);
    expect(handledFiles[0]?.status).toBe(OneDriveFixedFileStatus.Updated);
    expect(fs.rename).toHaveBeenCalled();
  });

  it('should not rename files in dry-run mode', async () => {
    (fs.readdir as any).mockResolvedValue([file]);
    (exiftool.read as any).mockResolvedValue({ ...metadata, CreateDate: '2022-01-01T13:00:00' });

    const handledFiles = await OneDriveNameDateFixer.updateFileNames(folderPath, true);

    expect(handledFiles).toHaveLength(1);
    expect(handledFiles[0]?.status).toBe(OneDriveFixedFileStatus.Updated);
    expect(fs.rename).not.toHaveBeenCalled();
  });
});
