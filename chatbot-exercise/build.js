import * as esbuild from 'esbuild';

// WTF only work without specifying "platform: 'node'"
await esbuild.build({
  bundle: true,
  entryPoints: ['src/main.ts'],
  outfile: 'dist/bundle.js',
  target: 'node20',
  format: 'esm',
  external: ['readline'],
});
