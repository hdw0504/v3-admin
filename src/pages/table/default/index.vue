<script setup lang="ts">
import type { CheckboxValueType } from 'element-plus'
import TablePro from '../components/TablePro.vue'
import type { ColumnProps, OperationProps } from '../components/types'
import type { User } from '@/api/interface'
import { getUserList } from '@/api/modules/user'

const tableData = ref<User.ResUserList[]>([])
getUserList({
  pageNum: 1,
  pageSize: 10,
}).then(({ data }) => {
  // console.log(data)
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
    minWidth: '200px',
  },
  {
    label: '邮箱',
    prop: 'email',
    minWidth: '180px',
  },
  {
    label: '居住地',
    prop: 'address',
    width: '180px',
  },
  {
    label: '创建时间',
    prop: 'createTime',
    width: '180px',
  },
  {
    label: '状态',
    prop: 'status',
  },
  {
    label: '操作',
    prop: 'operation',
    width: '280px',
    fixed: 'right',
  },
]
const defaltColumns = columns.map(i => i.prop)

const operation: OperationProps<User.ResUserList>[] = [
  {
    label: '启用',
    icon: 'on',
    visible: ({ row }) => !row.status,
    action: ({ row, column, $index }) => {
      ElMessage.success(`点击第${$index + 1}行的启用`)
      // console.log('启用', { row, column, $index })
    },
  },
  {
    label: '禁用',
    icon: 'off',
    visible: ({ row }) => !!row.status,
    action: ({ row, column, $index }) => {
      ElMessage.success(`点击第${$index + 1}行的禁用`)
      // console.log('禁用', { row, column, $index })
    },
  },
  {
    label: '查看',
    icon: 'detail',
    action: ({ row, column, $index }) => {
      ElMessage.success(`点击第${$index + 1}行的查看`)
      // console.log('查看', { row, column, $index })
    },
  },
  {
    label: '编辑',
    icon: 'edit',
    action: ({ row, column, $index }) => {
      ElMessage.success(`点击第${$index + 1}行的编辑`)
      // console.log('编辑', { row, column, $index })
    },
  },
  {
    label: '删除',
    icon: 'delete',
    action: ({ row, column, $index }) => {
      ElMessage.success(`点击第${$index + 1}行的删除`)
      // console.log('删除', { row, column, $index })
    },
  },
]

const selection = ref(true)
const expand = ref(true)

const selectColumns = ref(defaltColumns)
const selectAll = computed({
  get: () => selectColumns.value.length === columns.length,
  set: () => {}, // computed 默认只读
})
const isIndeterminate = computed(() => !!selectColumns.value.length && !selectAll.value)

function handleCheckAllChange(val: CheckboxValueType) {
  selectColumns.value = val ? defaltColumns : []
}

// 过滤后的数据
const filterColumn = useArrayFilter(columns, i => selectColumns.value.includes(i.prop))
</script>

<template>
  <div class="card-full">
    <div mb-4>
      <el-form inline>
        <el-form-item>
          <el-popover placement="bottom" trigger="click">
            <template #reference>
              <el-button> 展示列 </el-button>
            </template>
            <div>
              <el-checkbox
                v-model="selectAll"
                :indeterminate="isIndeterminate"
                @change="handleCheckAllChange"
              >
                全选
              </el-checkbox>
              <el-checkbox-group v-model="selectColumns">
                <el-checkbox v-for="col in columns" :key="col.prop" :label="col.prop">
                  {{ col.label }}
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </el-popover>
        </el-form-item>
        <el-form-item label="多选">
          <el-switch v-model="selection" />
        </el-form-item>
        <el-form-item label="更多">
          <el-switch v-model="expand" />
        </el-form-item>
        <el-form-item>
          <el-popover placement="bottom" trigger="click" :width="500">
            <template #reference>
              <el-button> columns 配置项 </el-button>
            </template>
            <div flex gap-4>
              <pre class="card">{{ columns.slice(0, columns.length / 2 + 1) }}</pre>
              <pre class="card">{{ columns.slice(columns.length / 2 + 1) }}</pre>
            </div>
          </el-popover>
        </el-form-item>
        <el-form-item>
          <el-popover placement="bottom" trigger="click" :width="250">
            <template #reference>
              <el-button> operation 配置项 </el-button>
            </template>
            <div>
              <pre class="card">{{ operation }}</pre>
            </div>
          </el-popover>
        </el-form-item>
      </el-form>
    </div>

    <TablePro :data="tableData" :selection="selection" :expand="expand" :columns="filterColumn" :operation="operation">
      <template #expand="{ row }">
        <code>{{ row }}</code>
      </template>

      <template #emailHeader="{ $index }">
        <el-tag>我是第{{ $index }}行的自定义表头</el-tag>
      </template>

      <template #gender="{ row }">
        {{ row.gender === 1 ? '男' : '女' }}
      </template>

      <template #status="{ row }">
        <el-tag :type="row.status ? 'success' : 'danger'">
          {{ row.status ? '正常' : '停用' }}
        </el-tag>
      </template>
    </TablePro>
  </div>
</template>

<style scoped>

</style>
