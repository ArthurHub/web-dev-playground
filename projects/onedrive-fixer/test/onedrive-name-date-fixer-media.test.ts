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
import { OneDriveNameDateFixer } from '../src/onedrive-name-date-fixer.js';
import { resolve } from 'path';
import { OneDriveFileToFixStatus } from '../src/entities.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const REAL_MEDIA_FOLDER = resolve(dirname(fileURLToPath(import.meta.url)), 'media');

describe('OneDriveNameDateFixer', () => {
  it('should have specific result matching media folder', async () => {
    const handledFiles = await OneDriveNameDateFixer.scan(REAL_MEDIA_FOLDER, vi.fn());
    await OneDriveNameDateFixer.fix(handledFiles, true, vi.fn());

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
    expect(noUpdateRequired[0]?.file.name).toEqual('20231202_104509_739_iOS.heic');
    expect(noUpdateRequired[0]?.newName).toBeUndefined();

    expect(skippedNotIPhone.length).toEqual(1);
    expect(skippedNotIPhone[0]?.file.name).toEqual('20231210_095729.jPG');
    expect(skippedNotIPhone[0]?.newName).toBeUndefined();
  });
});
