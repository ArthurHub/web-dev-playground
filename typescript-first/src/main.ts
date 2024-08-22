import * as fs from 'fs';
import { doSomething } from './play1.js';
import * as play2 from './play2.js';

type SomeType = string | number | any;

async function main() {
  // hello world
  var message = 'Hello World';
  console.log(message);

  displayValue('hello');
  displayValue(34534);
  displayValue(false);
  displayValue(null);
  let bla;
  displayValue(bla);
  displayValue(() => {});

  await readFiles();

  doSomething();

  play2.doSomething();
}

function displayValue(value: SomeType) {
  console.log(`The typeof of value is: ${typeof value}`);
  if (typeof value === 'string') {
    console.log(`The value is a string: "${value}"`);
  }
}

// read all the files in current folder
async function readFiles() {
  try {
    const files = await fs.promises.readdir('.');
    console.debug('Files:');
    for (const file of files) {
      const stats = await fs.promises.stat(file);
      console.debug(`${stats.isFile() ? 'File' : 'Folder'}: ${file};`);
    }
  } catch (err) {
    console.error(err);
  }
}

main();
