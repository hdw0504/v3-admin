import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  // transformerDirectives,
  // transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['text-icon', 'text-1.4em!'],
    ['color-fade', 'text-gray-900:50 dark:text-gray-300:50'],
    ['img-resize', 'resize max-w-full h-auto'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      // cdn: 'https://esm.sh/',
      // When using bundlers, you can provide the collections using dynamic imports so they will be bundler as async chunk and loaded on demand.
      collections: {
        carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default),
        ep: () => import('@iconify-json/ep/icons.json').then(i => i.default),
        mdi: () => import('@iconify-json/mdi/icons.json').then(i => i.default),
        // twemoji has some problem
        // twemoji: () => import('@iconify-json/twemoji/icons.json').then(i => i.default),
      },
      scale: 1.4,
      warn: true,
    }),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    // transformerVariantGroup(),
  ],
})
