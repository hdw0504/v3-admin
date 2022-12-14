<script setup lang="ts">
interface Props {
  modelValue: string
  name?: string
  text?: string
}
// 触发父组件
interface Emits {
  (e: 'update:modelValue', value: string | number): void
  (e: 'update:name', value: string): void
  (e: 'textChange', value: string): void
}
const props = withDefaults(defineProps<Props>(), {
  name: 'name',
  text: 'text',
})
const emit = defineEmits<Emits>()

const inputChange = (e: string | number) => {
  emit('update:modelValue', e)
}

const initName = 'name'
const changeName = () => {
  emit('update:name', props.name === initName ? 'new name' : initName)
}

const initText = 'text'
const changeText = () => {
  emit('textChange', props.text === initText ? 'new text' : initText)
}
</script>

<template>
  <div flex gap-2 flex-col>
    <el-input :model-value="modelValue" @input="inputChange" />
    <el-input :model-value="name" @input="emit('update:name', $event)">
      <template #append>
        <el-button @click="changeName">
          {{ name }}
        </el-button>
      </template>
    </el-input>
    <el-input :model-value="text" @input="emit('textChange', $event)">
      <template #append>
        <el-button @click="changeText">
          {{ text }}
        </el-button>
      </template>
    </el-input>
  </div>
</template>

<style scoped>

</style>
