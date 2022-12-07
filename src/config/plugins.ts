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

export function plugins(viteEnv: ViteEnv) {
  return [
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
  ]
}
