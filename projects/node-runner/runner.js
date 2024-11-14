const path = require('path');
const fs = require('fs');
const os = require('os');
const child_process = require('child_process');
const decompress = require('decompress');

async function main() {
  // create temp directory to unzip the bundle
  const tmpFolder = path.join(os.tmpdir(), 'node-runner');
  if (!fs.existsSync(tmpFolder)) {
    fs.mkdirSync(tmpFolder, { recursive: true });
  }

  // extract node.exe if doesn't exists
  const nodeExec = path.join(tmpFolder, 'node.exe');
  if (!fs.existsSync(nodeExec)) {
    console.log(`decompress node.exe`);
    await decompress(path.join(__dirname, 'build/assets/node.zip'), tmpFolder);
  }

  // extract node_modules if don't exists
  const nodeModules = path.join(tmpFolder, 'node_modules');
  if (!fs.existsSync(nodeModules)) {
    console.log(`decompress node_modules`);
    await decompress(path.join(__dirname, 'build/assets/node_modules.zip'), nodeModules);
  }

  // always copy bundle js file
  console.log(`Copy bundle.mjs`);
  await fs.promises.copyFile(
    path.join(__dirname, 'build/assets/bundle.mjs'),
    path.join(tmpFolder, 'bundle.mjs'),
  );

  // run the bundle with the node inside of it in the temp directory
  const node = path.join(tmpFolder, 'node.exe');
  const bundle = path.join(tmpFolder, 'bundle.mjs');
  console.log(`Run ${node} ${bundle}`);
  const child = child_process.spawn('cmd.exe', ['/c', node, bundle], {
    detached: true,
    stdio: 'ignore',
  });

  child.unref();
}

main();
