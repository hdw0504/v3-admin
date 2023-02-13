### 特殊的多行省略

目前不支持特殊图案 只尝试过文字
因为有背景图片。不能只用 css 去覆盖
因为 `scrollHeight` 和 `clientHeight` 不是响应式，需要根据不同情况JS去判断

目前限制及使用
1、css 高度必填
2、待判断的内容必传
3、可以用 css 的 `line-clamp-3` 等样式，也可以直接 `show-dots` (略有差距)

#### Props

```ts
interface Props {
  value: string // 需要把待判断的内容传进来，用于js判断高度
  showDots?: boolean // 是否展示三个点 默认 false
}
const props = withDefaults(defineProps<Props>(), {
  showDots: false,
})
```

使用

```html
<!-- 需要固定高度 其余就自定义 但是如果有行高需要修改内部省略的css -->
<LineClamp
  class="game-info"
  show-dots
  h-81px
  text-20px
  line-height-27px
  mb-42px
  :value="gameDetail.info"
>
  <!-- 这是当有省略需要展示的内容 -->
  <template #omit>
    <span color="#FFBA76" cursor-pointer>MORE</span>
  </template>
  <!-- 这是待判断的内容 -->
  <span mr-2>游戏简介: </span>
  <span>{{ gameDetail.info }}</span>
  <span ref="moreRef" break-keep color="#FFBA76" cursor-pointer>MORE</span>
</LineClamp>
```

当有行高或者高度有偏差导致省略的文本不对齐需要调整样式

```css
:deep(.game-info .omit-group) {
  --at-apply: line-height-30px;
}
```
