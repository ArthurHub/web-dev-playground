const level = process.env.LOG_LEVEL ?? 'warn';
export const config = {
  console: {
    level,
  },
};
