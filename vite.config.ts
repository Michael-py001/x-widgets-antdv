import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [vue(), vueJsx(), dts({ entryRoot: 'src', insertTypesEntry: true })],
  build: {
    lib: {
      entry: resolve(dirname(fileURLToPath(import.meta.url)), 'src/index.ts'),
      name: 'XWidgetsAntdv',
      cssFileName: 'index',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs')
    },
    rollupOptions: {
      external: ['vue', 'vue-router', 'ant-design-vue', 'dayjs', 'axios', '@ant-design/icons-vue'],
      output: { exports: 'named' }
    }
  }
});
