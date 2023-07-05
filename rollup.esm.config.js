import path from 'path';
import nodeResolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json';
import esbuild from 'rollup-plugin-esbuild'

export default {
  input: path.resolve(__dirname, './src/index.ts'),
  output: [
    {
      dir: path.resolve(__dirname, 'dist/esm'),
      format: 'esm',
    }
  ],
  preserveModules: true,
  plugins: [
    esbuild({
      target: 'es2018'
    }),
    nodeResolve(),
    json(),
  ],
  external: []
};