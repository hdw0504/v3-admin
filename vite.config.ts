/// <reference types="vitest" />

import { resolve } from 'path'
import type { ConfigEnv, UserConfig } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import Vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { visualizer } from 'rollup-plugin-visualizer'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import viteCompression from 'vite-plugin-compression'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import Unocss from 'unocss/vite'
import { wrapperEnv } from './src/utils/getEnv'
import { PreloadElementCss } from './src/config/preload'

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd())
  const viteEnv = wrapperEnv(env)

  return {
    base: './',
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 主题定制方案
          additionalData: '@use "@/styles/element/index.scss" as *;',
        },
      },
    },
    server: {
      // 服务器主机名，如果允许外部访问，可设置为 "0.0.0.0"
      host: '0.0.0.0',
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      // cors: true,
      // 代理跨域（mock 不需要配置跨域，直接能访问，这里只是个示例）
      proxy: {
        '/api': {
          target: 'https://mock.mengxuegu.com/mock/637490488ccc0e26d1d3c302/geek-admin',
          // target: 'https://mock.mengxuegu.com/mock/629d727e6163854a32e8307e',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
    plugins: [
      Vue({
        // 响应式语法糖
        reactivityTransform: true,
      }),
      // * vite 可以使用 jsx/tsx 语法
      vueJsx(),
      // 自动引入路由 https://github.com/hannoeru/vite-plugin-pages
      // Pages(),
      // 是否生成包预览(分析依赖包大小,方便做优化处理)
      viteEnv.VITE_REPORT && visualizer(),
      // gzip compress
      viteEnv.VITE_BUILD_GZIP
     && viteCompression({
       verbose: true,
       disable: false,
       threshold: 10240,
       algorithm: 'gzip',
       ext: '.gz',
     }),
      /**
      * name 可以写在 script 标签上
      * 当项目使用 keep-alive 时，可搭配组件name进行缓存过滤
      * DOM 做递归组件时需要
      * vue-devtools 调试工具里显示的组见名称是由 vue 中组件 name 决定的
      *
      * 在 vue 3.2.34 或以上的版本中，使用 <script setup> 的单文件组件会自动根据文件名生成对应的 name 选项
      * 即使是在配合 <KeepAlive> 使用时也无需再手动声明。
      * */
      VueSetupExtend(),

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: [
          'vue',
          'vue/macros',
          'vue-router',
          '@vueuse/core',
          'pinia',
        ],
        dirs: [
          './src/composables',
        ],
        dts: true,
        vueTemplate: true,
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass',
          }),
        ],
      }),

      // https://github.com/antfu/vite-plugin-components
      Components({
        dts: true,
        include: [/\.vue$/, /\.vue\?vue/, /\.vue\?v=/, /\.[jt]sx$/],
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass',
          }),
          IconsResolver({
            alias: {
            // park: 'icon-park',
            },
            customCollections: ['icons'],
          }),
        ],
      }),

      // https://github.com/antfu/unplugin-icons
      Icons({
        autoInstall: true,
        compiler: 'vue3',
        defaultClass: 'inline',
        customCollections: {
          icons: FileSystemIconLoader(
            './src/assets/icons',
          // svg => svg.replace(/^<svg /, '<svg fill="currentColor" '),
          ),
        },
      }),

      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      Unocss(),
    ],

    // 打包去除 console.log && debugger
    esbuild: {
      pure: viteEnv.VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    },
    build: {
      outDir: 'dist',
      minify: 'esbuild',
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          // Static resource classification and packaging
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        },
        // 把组件按组分块
        // https://rollupjs.org/guide/en/#outputmanualchunks
        // manualChunks: {
        //   'group-user': [
        //     './src/UserDetails',
        //     './src/UserDashboard',
        //     './src/UserProfileEdit',
        //   ],
        // },
      },
    },
    // preload modules
    optimizeDeps: {
      include: [
        'vue',
        'vue-router',
        'axios',
        'pinia',
        'mitt',
        ...PreloadElementCss(),
      ],
    },

    // https://github.com/vitest-dev/vitest
    test: {
      globals: true,
      environment: 'jsdom',
    },
  }
})
