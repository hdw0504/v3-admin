<script setup lang="ts">
import TablePro from '../components/TablePro.vue'
import type { ColumnProps, OperationProps } from '../components/types'
import type { User } from '@/api/interface'
import { getUserList } from '@/api/modules/user'

const tableData = ref<User.ResUserList[]>([])
getUserList({
  pageNum: 1,
  pageSize: 10,
}).then(({ data }) => {
  console.log(data)
  tableData.value = data.datalist
})

const columns: ColumnProps<User.ResUserList>[] = [
  {
    label: '用户名',
    prop: 'username',
  },
  {
    label: '性别',
    prop: 'gender',
  },
  {
    label: '年龄',
    prop: 'age',
  },
  {
    label: '身份证',
    prop: 'idCard',
    minWidth: '120px',
  },
  {
    label: '邮箱',
    prop: 'email',
    minWidth: '140px',
  },
  {
    label: '居住地',
    prop: 'address',
    width: '180px',
  },
  {
    label: '创建时间',
    prop: 'createTime',
    width: '170px',
  },
  {
    label: '操作',
    prop: 'operation',
    width: '220px',
    fixed: 'right',
  },
]

const operation: OperationProps<User.ResUserList>[] = [
  {
    label: '查看',
    icon: 'detail',
    action: ({ row, column, $index }) => {
      console.log('查看', { row, column, $index })
    },
  },
  {
    label: '编辑',
    icon: 'edit',
    action: ({ row, column, $index }) => {
      console.log('编辑', { row, column, $index })
    },
  },
  {
    label: '删除',
    icon: 'delete',
    action: ({ row, column, $index }) => {
      console.log('删除', { row, column, $index })
    },
  },
]
</script>

<template>
  <div class="card-full">
    <TablePro :data="tableData" :columns="columns" :operation="operation">
      <template #emailHeader="{ $index }">
        <el-tag>我是第{{ $index }}行的自定义表头</el-tag>
      </template>
      <template #gender="{ row }">
        {{ row.gender === 1 ? '男' : '女' }}
      </template>
    </TablePro>
  </div>
</template>

<style scoped>

</style>
