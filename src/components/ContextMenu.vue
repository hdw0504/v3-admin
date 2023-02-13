<script setup lang="ts">
import type { VNode } from 'vue'

interface MenuItem {
  icon?: string
  value: string
  action?: () => void
  children?: MenuItem[]
}
interface BoxStyle {
  display?: string
  top?: string
  left?: string
}
interface Props {
  data?: MenuItem[]
  appendToBody?: boolean
  targetRef?: HTMLElement | HTMLElement[]
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  appendToBody: true,
})

// const { x, y } = useMouse()
const visible = ref(false)
const contextMenuRef = ref()

const boxStyle = ref<BoxStyle>({ display: 'none' })

function showMenuStyle(event: MouseEvent) {
  return {
    top: `${event.pageY}px`,
    left: `${event.pageX}px`,
  }
}

function hideMenu() {
  visible.value = false
  boxStyle.value = {
    display: 'none',
  }
}

function renderMenu(data: MenuItem[]): VNode {
  return h('div', {
    class: 'menu-box',
    style: boxStyle.value,
  }, h('ul', data?.map(i => renderItem(i))))
}

function renderSubMenu(data: MenuItem[]): VNode {
  return h('div', {
    class: 'menu-box sub-box',
    style: { top: '0px', left: '100%' },
  }, h('ul', data?.map(i => renderItem(i))))
}

function renderItem(item: MenuItem): VNode {
  return h('li', {
    class: item.children?.length && 'has-children',
    onClick: () => {
      item.action?.()
      hideMenu()
    },
  }, [h('span', item.value)].concat(
    item.children?.length
      ? renderSubMenu(item.children)
      : [],
  ))
}

function addEventLisener(ref: HTMLElement | Window) {
  return useEventListener(ref, 'contextmenu', (event) => {
    // console.log(ref)

    visible.value = true
    boxStyle.value = showMenuStyle(event as MouseEvent)
    event.preventDefault()
  })
}

nextTick(() => {
  if (!props.targetRef)
    addEventLisener(window)

  else if (Array.isArray(props.targetRef))
    props.targetRef.forEach(ref => addEventLisener(ref))

  else
    addEventLisener(props.targetRef)
})

onClickOutside(contextMenuRef, (event) => {
//   console.log('?')
  hideMenu()
})
</script>

<template>
  <teleport to="body" :disabled="!appendToBody">
    <component :is="renderMenu(data)" ref="contextMenuRef" />
  </teleport>
</template>

<style lang="scss" scoped>
.dark .menu-box {
    --bg-color: #141414;
    --bg-color-hover: #191919;
    --b-color: #414243;
}

.menu-box {
    --bg-color: #ffffff;
    --bg-color-hover: #f6f6f6;
    --b-color: #e4e7ed;
    --min-w-size: 10rem;
    --rd-size: 0.5rem;
    --py-size: 0.3rem;
    --px-size: 0.5rem;
}

.menu-box {
    --at-apply: absolute box-border;
    border: 1px solid var(--b-color);
    background-color: var(--bg-color);
    min-width: var(--min-w-size);
    padding: var(--px-size) 0;
    border-radius: var(--rd-size);

    li {
        --at-apply: relative;
        padding: var(--py-size) var(--px-size);

        &:hover {
            --at-apply: cursor-pointer;
            background-color: var(--bg-color-hover);
        }

        &.has-children::after{
            --at-apply: absolute;
            content: '>';
            right: var(--px-size);
        }
    }

    &.sub-box {
        --at-apply: display-none;
    }

    li:hover>.sub-box {
        --at-apply: display-block;
    }
}
</style>
