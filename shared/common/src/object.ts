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
 * Base class for all classes to support nice toString() method
 */
export abstract class BaseClass {
  toString(): string {
    const entries = Object.entries(this)
      .map(([key, value]) => `${key}: "${String(value).substring(0, 50)}"`)
      .join(', ');
    return `${this.constructor.name}:(${entries})`;
  }
}
