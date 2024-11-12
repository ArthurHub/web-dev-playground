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
  const timezoneIdx = dateString.lastIndexOf('+');
  dateString = timezoneIdx === -1 ? dateString : dateString.substring(0, timezoneIdx);

  // this will create the Date adjusted to the local timezone
  return new Date(dateString);
}

// TODO: understand "unknown" type error handling
export function handleErrorUnknown(ex: unknown): Error {
  if (ex instanceof Error) {
    return ex;
  } else if (typeof ex === 'string') {
    return new Error(ex);
  }
  // return `${ex.name}: ${ex.message} + ${ex.cause ? String(ex.cause) : ''} ${
  //   ex.stack ? `\n${ex.stack}` : ''
  // }`;
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  return new Error(`An error with info: "${String(ex ?? 'Unknown')}"`);
}
