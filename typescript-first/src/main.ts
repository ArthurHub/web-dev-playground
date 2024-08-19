import * as fs from "fs";
import { doSomething } from "./play1.js";
import * as play2 from "./play2.js";

async function main() {
  // hello world
  var message = "Hello World";
  console.log(message);

  await readFiles();

  doSomething();

  play2.doSomething();
}

// read all the files in current folder
async function readFiles() {
  try {
    const files = await fs.promises.readdir(".");
    console.debug("Files:");
    for (const file of files) {
      const stats = await fs.promises.stat(file);
      console.debug(`${stats.isFile() ? "File" : "Folder"}: ${file};`);
    }
  } catch (err) {
    console.error(err);
  }
}

main();
