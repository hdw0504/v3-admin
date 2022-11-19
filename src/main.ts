import { createApp } from 'vue'

// iconfont css
// import "@/assets/iconfont/iconfont.scss";
// font css
// import "@/assets/fonts/font.scss";
// element plus
import ElementPlus from 'element-plus'
// element icons
import * as Icons from '@element-plus/icons-vue'
// element 样式 (内置暗黑模式)
import 'element-plus/theme-chalk/dark/css-vars.css'
// custom element dark(自定义暗黑模式)
import '@/styles/theme/element-dark.scss'
// custom element css
import '@/styles/element.scss'
// reset style sheet
import '@/styles/reset.scss'
// CSS common style sheet
import '@/styles/common.scss'
// css root var
import '@/styles/root.scss'

import App from './App.vue'
// custom directives
import directives from '@/directives/index'
// vue Router
import router from '@/routers/index'
// vue i18n
// import I18n from "@/languages/index";
// pinia store
import pinia from '@/stores/index'
// svg icons
import 'virtual:svg-icons-register'
// errorHandler
import errorHandler from '@/utils/errorHandler'

import '@unocss/reset/tailwind.css'
import 'uno.css'

const app = createApp(App)

app.config.errorHandler = errorHandler

// 注册element Icons组件
Object.entries(Icons).forEach(([key, component]) => {
  app.component(key, component)
})

app.use(router).use(pinia).use(directives).use(ElementPlus).mount('#app')
