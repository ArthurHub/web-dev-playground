const { spawn } = require('child_process');

const child = spawn('cmd.exe', ['/c', 'bin\\node.exe', 'bin\\bundle.mjs'], {
  detached: true,
  stdio: 'ignore',
});

child.unref();
