import { describe, it, expect } from 'vitest';
import { OneDriveNameDateFixer } from '../src/onedrive-name-date-fixer.js';
import { resolve } from 'path';
import { OneDriveFileToFixStatus } from '../src/entities.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const REAL_MEDIA_FOLDER = resolve(dirname(fileURLToPath(import.meta.url)), 'media');

describe('OneDriveNameDateFixer', () => {
  it('should have specific result matching media folder', async () => {
    const dryRun = true;
    const handledFiles = await OneDriveNameDateFixer.scan(REAL_MEDIA_FOLDER, () => {});
    await OneDriveNameDateFixer.fix(handledFiles, true, () => {});

    expect(handledFiles.length).toEqual(5);

    const updated = handledFiles.filter((file) => file.status === OneDriveFileToFixStatus.UpdateComplete);
    const noUpdateRequired = handledFiles.filter((file) => file.status === OneDriveFileToFixStatus.NoUpdateRequired);
    const skippedNotIPhone = handledFiles.filter((file) => file.status === OneDriveFileToFixStatus.SkippedNotIPhone);

    expect(updated.length).toEqual(3);
    for (const file of updated) {
      expect(['20220412_132854446_iOS.jpg', '20241101_094622039_iOS.heic', '20241111_204349000_iOS.MOV']).toContain(
        file.newName,
      );
    }

    expect(noUpdateRequired.length).toEqual(1);
    expect(noUpdateRequired[0].file.name).toEqual('20231202_104509_739_iOS.heic');
    expect(noUpdateRequired[0].newName).toBeUndefined();

    expect(skippedNotIPhone.length).toEqual(1);
    expect(skippedNotIPhone[0].file.name).toEqual('20231210_095729.jPG');
    expect(skippedNotIPhone[0].newName).toBeUndefined();
  });
});
