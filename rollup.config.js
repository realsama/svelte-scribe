import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import copy from 'rollup-plugin-copy';

import { nodeResolve } from '@rollup/plugin-node-resolve';

export default [
    {
        input: 'src/index.ts',
        output: [{ file: 'dist/main.mjs', format: 'esm', sourcemap: true }],
        external: ['fs', 'js-yaml', '@markdoc/markdoc', 'path'],
        plugins: [
            typescript(),
            nodeResolve(),
            terser(),
            copy({
                targets: [{ src: 'src/RenderLayout.svelte', dest: 'dist' }],
            }),
        ],
    },
];
