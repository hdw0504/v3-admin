# 个人记录
项目基于 [vitesse-lite](https://github.com/antfu/vitesse-lite) 搭建
复刻 [Geeker-Admin](https://github.com/HalseySpicy/Geeker-Admin)

## TODO:
- 尝试打包优化 [项目打包优化实战之-视图分析](https://blog.csdn.net/g18204746769/article/details/127431733)
- ~~~解决 `unplugin-auto-import` 在加载登录页的时候并未注册 `ElMessage` 和 `ElNotification`~~~

## unocss
如何 import 别的css文件（里面包含unocss的--at-apply）

在 `scss` 中使用 `@apply` 会有点问题 [@apply bug issue](https://github.com/unocss/unocss/issues/809)
解决方案：使用 `--at-apply:` 代替 `@apply`
```css
<style scoped>
[redfoo] {
-  @apply text-red;
+  --at-apply: text-red;
}
[bluefoo] {
-  @apply text-blue;
+  --at-apply: text-blue;
}
</style>
```
```ts
// unocss.config.ts
transformers: [
  transformerDirectives()
]
```

## Pinia
使用 `setup store` 替代 `option store (vuex)` 的写法 [setup-stores](https://pinia.vuejs.org/zh/core-concepts/#setup-stores)
官网话术：
在 _Setup Store_ 中：
- `ref()` 就是 `state` 属性
- `computed()` 就是 `getters`
- `function()` 就是 `actions`

Setup store 比 Option Store 带来了更多的灵活性，因为你可以在一个 store 内创建侦听器，并自由地使用任何组合式函数。==不过，请记住，使用组合式函数会让 SSR 变得更加复杂。==



