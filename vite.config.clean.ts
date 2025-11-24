<<<<<<< HEAD
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {},
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      'figma:asset/d0162c32edc73cb1120e888914e12eeb1707090d.png': path.resolve(__dirname, './src/assets/d0162c32edc73cb1120e888914e12eeb1707090d.png'),
      'figma:asset/cc572572013fed7ea1d15352963344bd1131bddf.png': path.resolve(__dirname, './src/assets/cc572572013fed7ea1d15352963344bd1131bddf.png'),
    },
  },
  build: {
    target: 'esnext',
    outDir: 'build',
  },
  server: {
    port: 3000,
    open: true,
  },
});
=======
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {},
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      'figma:asset/d0162c32edc73cb1120e888914e12eeb1707090d.png': path.resolve(__dirname, './src/assets/d0162c32edc73cb1120e888914e12eeb1707090d.png'),
      'figma:asset/cc572572013fed7ea1d15352963344bd1131bddf.png': path.resolve(__dirname, './src/assets/cc572572013fed7ea1d15352963344bd1131bddf.png'),
    },
  },
  build: {
    target: 'esnext',
    outDir: 'build',
  },
  server: {
    port: 3000,
    open: true,
  },
});
>>>>>>> 64edcef (Kemlok-Technologies)
