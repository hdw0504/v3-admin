import { createApp } from 'vue'

// iconfont css
// import "@/assets/iconfont/iconfont.scss";
// font css
import '@/assets/fonts/index.scss'
// element icons => ni @element-plus/icons-vue
// import * as Icons from '@element-plus/icons-vue'

// 看自己心情要不要删掉tailwind
import '@unocss/reset/tailwind.css'
// unocss
import 'uno.css'
// 可修改主题的 element 样式 (内置暗黑模式)
import '@/styles/index.scss'
// custom element css
import '@/styles/element.scss'
// css common style sheet
import '@/styles/common.scss'

import App from './App.vue'
// pinia store
import pinia from '@/stores/index'
// vue Router
import router from '@/routers/index'
// errorHandler
import errorHandler from '@/utils/errorHandler'
// custom directives
import directives from '@/directives/index'
// vue i18n
// import I18n from "@/languages/index";

const app = createApp(App)

// 用于为应用内抛出的未捕获错误指定一个全局处理函数
// https://cn.vuejs.org/api/application.html#app-config-errorhandler
app.config.errorHandler = errorHandler

// 注册element Icons组件 (为了减少包体积 使用 @iconify/vue 异步图标走接口)
// Object.entries(Icons).forEach(([key, component]) => {
//   app.component(key, component)
// })

app.use(pinia).use(router).use(directives).mount('#app')
