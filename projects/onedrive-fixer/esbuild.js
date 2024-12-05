import { build } from 'esbuild';

const ESM_REQUIRE_SHIM = `
const { dirname: shimDirname } = await import("path");
const { fileURLToPath: shimFileURLToPath } = await import("url");
globalThis.__filename = shimFileURLToPath(import.meta.url);
globalThis.__dirname = shimDirname(globalThis.__filename);
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
`;

const buildOptions = {
  bundle: true,
  entryPoints: ['src/main.ts'],
  outfile: 'out/bundle/bundle.mjs',
  platform: 'node',
  target: 'node22',
  format: 'esm',
  minify: false,
  treeShaking: false,
  banner: { js: ESM_REQUIRE_SHIM },
  external: ['pino', 'exiftool-vendored', 'trash'],
};

await build(buildOptions);
