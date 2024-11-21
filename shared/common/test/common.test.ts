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

import { describe, it, expect } from 'vitest';
import { compareIgnoreCase, getDateIgnoreTimezone, handleErrorUnknown } from '../src/common.js';

describe('compareIgnoreCase', () => {
  it('should return true for equal strings ignoring case', () => {
    expect(compareIgnoreCase('test', 'TEST')).toBe(true);
  });

  it('should return false for different strings', () => {
    expect(compareIgnoreCase('test', 'different')).toBe(false);
  });

  it('should return false if either string is undefined', () => {
    expect(compareIgnoreCase(undefined, 'test')).toBe(false);
    expect(compareIgnoreCase('test', undefined)).toBe(false);
    expect(compareIgnoreCase(undefined, undefined)).toBe(false);
  });
});

describe('getDateIgnoreTimezone', () => {
  it('should return a Date object ignoring the timezone', () => {
    const dateStr = '2022-01-01T12:25:00';
    expect(getDateIgnoreTimezone(dateStr + '+02:00')).toEqual(new Date(dateStr));
    expect(getDateIgnoreTimezone(dateStr + '+07:30')).toEqual(new Date(dateStr));
    expect(getDateIgnoreTimezone(dateStr + '-05:00')).toEqual(new Date(dateStr));
    expect(getDateIgnoreTimezone(dateStr + '+00:00')).toEqual(new Date(dateStr));
  });

  it('should return a Date object if no timezone is present', () => {
    const dateStr = '2022-01-01T12:25:00';
    const date = getDateIgnoreTimezone(dateStr + '+02:30');
    expect(date).toEqual(new Date(dateStr));
  });

  it('should not change date', () => {
    for (const dateStr of [
      '2022-01-01T12:00:00',
      '2022-01-01T23:59:00',
      '2022-01-01T23:59:00+11:00',
      '2022-01-01T23:59:00-10:00',
    ]) {
      const date = getDateIgnoreTimezone(dateStr);
      expect(date.getDate()).toEqual(1);
      expect(date.getUTCMonth()).toEqual(0);
      expect(date.getFullYear()).toEqual(2022);
    }
  });

  it('should throw an error if dateString is undefined', () => {
    expect(() => getDateIgnoreTimezone(undefined)).toThrow('Date string is undefined');
  });
});

describe('handleErrorUnknown', () => {
  it('should return the error if the input is an instance that extends Error', () => {
    class CustomError extends Error {}
    const error = new CustomError('Test error');
    expect(handleErrorUnknown(error)).toBe(error);
  });

  it('should return the error if the input is an instance of Error', () => {
    const error = new Error('Test error');
    expect(handleErrorUnknown(error)).toBe(error);
  });

  it('should return an Error object if the input is a string', () => {
    const error = handleErrorUnknown('Test error');
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('Test error');
  });

  it('should return an Error object with a generic message for other types', () => {
    const error = handleErrorUnknown(123);
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('An error with info: "123"');
  });

  it('should return an Error object with a generic message for undefined', () => {
    const error = handleErrorUnknown(undefined);
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('An error with info: "Unknown"');
  });
});
