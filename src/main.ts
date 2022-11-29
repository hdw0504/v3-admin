import { createApp } from 'vue'

// iconfont css
// import "@/assets/iconfont/iconfont.scss";
// font css
// import "@/assets/fonts/font.scss";
// element icons => ni @element-plus/icons-vue
// import * as Icons from '@element-plus/icons-vue'
import App from './App.vue'
// custom directives
import directives from '@/directives/index'
// vue Router
import router from '@/routers/index'
// vue i18n
// import I18n from "@/languages/index";
// pinia store
import pinia from '@/stores/index'
// errorHandler
import errorHandler from '@/utils/errorHandler'
// 可修改主题的 element 样式 (内置暗黑模式)
import '@/styles/index.scss'
// 看自己心情要不要删掉tailwind
import '@unocss/reset/tailwind.css'
import 'uno.css'

const app = createApp(App)

// 用于为应用内抛出的未捕获错误指定一个全局处理函数
// https://cn.vuejs.org/api/application.html#app-config-errorhandler
app.config.errorHandler = errorHandler

// 注册element Icons组件 (为了减少包体积 使用 @iconify/vue 异步图标走接口)
// Object.entries(Icons).forEach(([key, component]) => {
//   app.component(key, component)
// })

app.use(router).use(pinia).use(directives).mount('#app')
