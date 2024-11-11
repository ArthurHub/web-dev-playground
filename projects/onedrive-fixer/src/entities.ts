import type { Dirent } from 'fs';

export interface OneDriveFixedFile {
  file: Dirent;
  status: OneDriveFixedFileStatus;
  error?: unknown;
}

export enum OneDriveFixedFileStatus {
  Updated = 'UPDATED',
  NoUpdateRequired = 'NO_UPDATE_REQUIRED',
  SkippedNotIPhone = 'SKIPPED_NOT_IPHONE',
  SkippedDateUnknown = 'SKIPPED_DATE_UNKNOWN',
  Error = 'ERROR',
}
