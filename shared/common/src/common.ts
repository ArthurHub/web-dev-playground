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
export function handleErrorUnknown(ex: unknown): Error {
  if (ex instanceof Error) {
    return ex;
  } else if (typeof ex === 'string') {
    return new Error(ex);
  }
  // return `${ex.name}: ${ex.message} + ${ex.cause ? String(ex.cause) : ''} ${
  //   ex.stack ? `\n${ex.stack}` : ''
  // }`;
  return new Error(`An error with info: "${String(ex ?? 'Unknown')}"`);
}
