import type { Dirent } from 'fs';

export interface OneDriveFileToFix {
  file: Dirent;
  status: OneDriveFileToFixStatus;
  newName?: string;
  error?: unknown;
}

export enum OneDriveFileToFixStatus {
  UpdateRequired = 'UPDATE_REQUIRED',
  UpdateComplete = 'UPDATE_COMPLETE',
  NoUpdateRequired = 'NO_UPDATE_REQUIRED',
  SkippedNotIPhone = 'SKIPPED_NOT_IPHONE',
  SkippedDateUnknown = 'SKIPPED_DATE_UNKNOWN',
  Error = 'ERROR',
}
