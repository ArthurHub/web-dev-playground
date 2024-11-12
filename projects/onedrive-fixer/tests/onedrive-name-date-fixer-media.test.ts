import { describe, it, expect } from 'vitest';
import { OneDriveNameDateFixer } from '../src/onedrive-name-date-fixer.js';
import { resolve } from 'path';
import { OneDriveFixedFileStatus } from '../src/entities.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const REAL_MEDIA_FOLDER = resolve(dirname(fileURLToPath(import.meta.url)), 'media');

describe('OneDriveNameDateFixer', () => {
  it('should have specific result matching media folder', async () => {
    const dryRun = true;
    const handledFiles = await OneDriveNameDateFixer.updateFileNames(REAL_MEDIA_FOLDER, dryRun);

    expect(handledFiles.length).toEqual(4);

    const updated = handledFiles.filter((file) => file.status === OneDriveFixedFileStatus.Updated);
    const noUpdateRequired = handledFiles.filter(
      (file) => file.status === OneDriveFixedFileStatus.NoUpdateRequired,
    );
    const skippedNotIPhone = handledFiles.filter(
      (file) => file.status === OneDriveFixedFileStatus.SkippedNotIPhone,
    );

    expect(updated.length).toEqual(2);
    expect(noUpdateRequired.length).toEqual(1);
    expect(skippedNotIPhone.length).toEqual(1);
  });
});
