<script setup lang="ts" name="home">
const svgs = [
  {
    width: '26',
    src: 'https://cn.vuejs.org/logo.svg',
    href: 'https://cn.vuejs.org/',
  },
  {
    width: '28',
    src: 'https://vueuse.org/favicon.svg',
    href: 'https://vueuse.org/',
  },
  {
    width: '26',
    src: 'https://element-plus.gitee.io/images/element-plus-logo-small.svg',
    href: 'https://element-plus.gitee.io/zh-CN/',
  },
  {
    width: '24',
    src: 'https://uno.antfu.me/favicon.svg',
    href: 'https://uno.antfu.me/',
  },
  {
    width: '28',
    src: 'https://cn.vitest.dev/logo.svg',
    href: 'https://cn.vitest.dev/',
  },
  {
    width: '18',
    src: 'https://pinia.vuejs.org/logo.svg',
    href: 'https://pinia.vuejs.org/zh/index.html',
  },
]
</script>

<template>
  <div class="card-full" flex flex-col justify-center items-center gap-8>
    <div text-6xl m-t--40>
      welcome!
      <span animation class="wave">👋🏻</span>
    </div>
    <div text-4xl>
      project use with
      <a v-for="(svg, i) in svgs" :key="i" :href="svg.href" target="_blank">
        <img v-bind="svg">
      </a>
    </div>
    <div text-2xl>
      default error page
      <el-button m-l-2 @click="$router.push({ name: '403' })">
        403
      </el-button>
      <el-button @click="$router.push({ name: '404' })">
        404
      </el-button>
      <el-button @click="$router.push({ name: '500' })">
        500
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
div a {
  img{
    --at-apply: inline-block;

  }
  &:not(:nth-child(1)) img{
    --at-apply: m-l-2;
  }
}
.wave {
  animation-name: wave-animation;
  animation-duration: 2.5s;
  animation-iteration-count: infinite;
  transform-origin: 70% 70%;
  display: inline-block;
}

@keyframes wave-animation {
  0% {
    transform: rotate(0deg);
  }
  10% {
    transform: rotate(14deg);
  }
  20% {
    transform: rotate(-8deg);
  }
  30% {
    transform: rotate(14deg);
  }
  40% {
    transform: rotate(-4deg);
  }
  50% {
    transform: rotate(10deg);
  }
  60% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
