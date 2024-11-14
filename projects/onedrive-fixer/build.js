import { build } from 'esbuild';

const ESM_REQUIRE_SHIM = `
const { dirname } = await import("path");
const { fileURLToPath } = await import("url");
globalThis.__filename = fileURLToPath(import.meta.url);
globalThis.__dirname = dirname(globalThis.__filename);
import { createRequire } from 'module'; 
const require = createRequire(import.meta.url);
`;

const buildOptions = {
  bundle: true,
  entryPoints: ['src/main.ts'],
  outfile: 'dist/bundle/bundle.mjs',
  platform: 'node',
  target: 'node22',
  format: 'esm',
  minify: false,
  treeShaking: false,
  banner: { js: ESM_REQUIRE_SHIM },
  external: ['pino', 'exiftool-vendored'],
};

await build(buildOptions);
