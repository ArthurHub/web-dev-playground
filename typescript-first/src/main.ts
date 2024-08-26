import * as fs from 'fs/promises';
import { doSomething } from './play1.js';
import * as play3 from './play3.js';
import * as play2 from './play2.js';

type SomeType = string | number | any;

async function main(): Promise<void> {
  // hello world
  const message = 'Hello World';
  const object = { msg: 'Hello World' };
  console.log(`${message} ${object.msg}`);

  play3.doSomething();
  return;

  displayValue('hello');
  displayValue(34534);
  displayValue(false);
  displayValue(null);
  let bla;
  displayValue(bla);
  displayValue(() => {
    console.log('empty code');
  });

  await readFiles();

  doSomething();

  play2.doSomething();

  process.emit('exit', 123);
}

/**
 * Display the value type to console.log
 * @param value a value to test it's type
 */
function displayValue(value: SomeType): void {
  console.log(`The typeof of value is: ${typeof value}`);
  if (typeof value === 'string') {
    console.log(`The value is a string: "${value}"`);
  }
}

// read all the files in current folder
async function readFiles(): Promise<void> {
  try {
    const files = await fs.readdir('.');
    console.debug('Files:');
    for (const file of files) {
      const stats = await fs.stat(file);
      console.debug(`${stats.isFile() ? 'File' : 'Folder'}: ${file};`);
    }
  } catch (err) {
    console.error(err);
  }
}

await main();
