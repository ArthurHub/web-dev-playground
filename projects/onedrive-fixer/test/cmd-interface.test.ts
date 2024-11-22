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

import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { Options, runOneDriveFixerCmdUserInterface } from '../src/cmd-interface.js';
import { select, confirm } from '@inquirer/prompts';
import { existsSync, readFileSync } from 'fs';
import { OneDriveNameDateFixer } from '../src/onedrive-name-date-fixer.js';
import { HEICtoJpegConverter } from '../src/heic-to-jpeg-converter.js';
import { OneDriveFileToFixStatus } from '../src/entities.js';

vi.mock('@inquirer/prompts');
vi.mock('fs');
vi.mock('../src/onedrive-name-date-fixer.js');
vi.mock('../src/heic-to-jpeg-converter.js');

// Group tests for OneDrive Fixer Command Interface
describe('OneDrive Fixer Command Interface', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should execute the full flow for fixing file names', async () => {
    (select as Mock)
      .mockResolvedValueOnce(Options.FixFileNames) // First prompt to select the option
      .mockResolvedValueOnce('/valid/path') // Prompt to select the folder path
      .mockResolvedValueOnce({ run: true, dryRun: false })
      .mockResolvedValueOnce(Options.Exit);

    (existsSync as Mock).mockReturnValue(true);
    (readFileSync as Mock).mockReturnValue(JSON.stringify({ lastUsedPaths: ['/valid/path'] }));
    const fileToFix = { status: OneDriveFileToFixStatus.UpdateRequired, file: { name: 'file1' }, newName: 'newFile1' };
    (OneDriveNameDateFixer.scan as Mock).mockResolvedValue([fileToFix]);
    (confirm as Mock).mockResolvedValueOnce(true); // Confirm to proceed with fixing files
    (OneDriveNameDateFixer.fix as Mock).mockResolvedValue(undefined);

    await runOneDriveFixerCmdUserInterface();

    expect(select).toHaveBeenCalledTimes(4);
    expect(OneDriveNameDateFixer.scan).toHaveBeenCalledWith('/valid/path', expect.any(Function));
    expect(OneDriveNameDateFixer.fix).toHaveBeenCalledWith([fileToFix], false, expect.any(Function));
  });

  it('should execute the full flow for converting HEIC to JPEG', async () => {
    (select as Mock)
      .mockResolvedValueOnce(Options.ConvertHEICtoJPEG) // First prompt to select the option
      .mockResolvedValueOnce('/valid/path') // Prompt to select the folder path
      .mockResolvedValueOnce({ run: true, dryRun: false })
      .mockResolvedValueOnce(Options.Exit);

    (existsSync as Mock).mockReturnValue(true);
    (readFileSync as Mock).mockReturnValue(JSON.stringify({ lastUsedPaths: ['/valid/path'] }));
    (HEICtoJpegConverter.scan as Mock).mockResolvedValue([{ name: 'photo1.HEIC' }]);
    (confirm as Mock).mockResolvedValueOnce(true); // Confirm to proceed with conversion
    (HEICtoJpegConverter.convert as Mock).mockResolvedValue(undefined);

    await runOneDriveFixerCmdUserInterface();

    expect(select).toHaveBeenCalledTimes(4);
    expect(HEICtoJpegConverter.scan).toHaveBeenCalledWith('/valid/path');
    expect(HEICtoJpegConverter.convert).toHaveBeenCalledWith({ name: 'photo1.HEIC' }, false);
  });

  it('should exit when Exit option is selected', async () => {
    (select as Mock).mockResolvedValue(Options.Exit);

    await runOneDriveFixerCmdUserInterface();

    expect(select).toHaveBeenCalled();
    // expect(logger.info).not.toHaveBeenCalledWith(expect.stringContaining('Run fix media files names'));
  });
});
