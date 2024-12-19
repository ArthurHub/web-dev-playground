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

import process from 'node:process';

/** True if the first char in the string is a digit, anything else is false */
export function isDigit(char?: string): boolean {
  return !!char && char >= '0' && char <= '9';
}

/**
 * Compare strings ignoring case. if any or both of the strings is undefined, return false.
 */
export function compareIgnoreCase(str1: string | undefined, str2: string | undefined): boolean {
  if (!str1 || !str2) return false;
  return str1.localeCompare(str2, undefined, { sensitivity: 'base' }) === 0;
}

/** Get the Exif date ignoring the timezone in it */
export function getDateIgnoreTimezone(dateString: string | undefined): Date {
  if (!dateString) {
    throw new Error('Date string is undefined');
  }

  // if timezone is present, remove it
  let timezoneIdx = dateString.lastIndexOf('+');
  timezoneIdx = timezoneIdx !== -1 ? timezoneIdx : dateString.lastIndexOf('-');
  dateString =
    timezoneIdx > 10 // pass the date part in the string
      ? dateString.substring(0, timezoneIdx)
      : dateString;

  // this will create the Date adjusted to the local timezone
  return new Date(dateString);
}

/**
 * Get the error object from an unknown error object.
 * https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript?utm_source=pocket_shared
 */
export function handleErrorUnknown(err: unknown): Error {
  if (err instanceof Error) {
    // just an error
    return err;
  } else if (typeof err === 'string') {
    // just a string
    return new Error(err);
  }
  try {
    if (
      typeof err === 'object' &&
      err !== null &&
      'message' in err &&
      typeof (err as Record<string, unknown>)['message'] === 'string'
    ) {
      // an object that has a message property
      return new Error(typeof (err as Record<string, unknown>)['message'], { cause: err });
    }
  } catch {
    // ignore
  }
  try {
    // whatever object
    return new Error(JSON.stringify(err), { cause: err });
  } catch {
    // fallback in case there's an error stringifying
    return new Error(String(err), { cause: err });
  }
}

export function isPlainObject(value: unknown): boolean {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const prototype = Object.getPrototypeOf(value);
  return (
    (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) &&
    !(Symbol.toStringTag in value) &&
    !(Symbol.iterator in value)
  );
}

export function isProcessRunning(pid: number): boolean {
  try {
    return process.kill(pid, 0);
  } catch (e) {
    return (e as NodeJS.ErrnoException).code === 'EPERM';
  }
}
