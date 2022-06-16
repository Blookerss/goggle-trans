import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
/**
 * @type {import('vite').UserConfig}
 */
export default defineConfig({
    build: {
        outDir: 'build',
        target: 'esnext'
    },
    resolve: {
        alias: {
            common: '/src/common',
            components: '/src/components',
            voxelnents: '/voxeliface/components'
        }
    },
    plugins: [
        react()
    ]
});