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

// TODO: understand "unknown" type error handling
export function getFriendlyError(error: unknown): string {
  if (error instanceof Error) {
    return `${error.name}: ${error.message} + ${error.cause ? String(error.cause) : ''} ${
      error.stack ? `\n${error.stack}` : ''
    }`;
  }
  return 'An error occurred: ' + String(error ?? 'Unknown');
}
