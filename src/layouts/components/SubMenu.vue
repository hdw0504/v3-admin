<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { hump2line } from '@/utils/string'

defineProps<{ menuList: Menu.MenuOptions[] }>()

const router = useRouter()
const handleClickMenu = (subItem: Menu.MenuOptions) => {
  if (subItem.meta.isLink)
    window.open(subItem.meta.isLink, '_blank')
  router.push(subItem.path)
}
</script>

<template>
  <template v-for="subItem in menuList" :key="subItem.path">
    <el-sub-menu v-if="subItem.children && subItem.children.length > 0" :index="subItem.path">
      <template #title>
        <Icon mr-2 :icon="`ep:${hump2line(subItem.meta.icon)}`" />
        <!-- <el-icon>
          <component :is="elPlusIconsDict[subItem.meta.icon]" />
        </el-icon> -->
        <span>{{ subItem.meta.title }}</span>
      </template>
      <SubMenu :menu-list="subItem.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="subItem.path" @click="handleClickMenu(subItem)">
      <!-- <el-icon>
        <component :is="elPlusIconsDict[subItem.meta.icon]" />
      </el-icon> -->
      <Icon mr-2 :icon="`ep:${hump2line(subItem.meta.icon)}`" />
      <template #title>
        <span>{{ subItem.meta.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<style lang="scss" scoped>

</style>
