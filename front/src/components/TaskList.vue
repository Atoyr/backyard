<template>
  <div class="space-y-4">
    <!-- ヘッダー -->
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold tracking-tight">TODO一覧</h2>
    </div>

    <!-- ローディング状態 -->
    <div v-if="loading && taskList.length === 0" class="flex items-center justify-center py-8">
      <span>読み込み中...</span>
    </div>

    <!-- TODOリスト -->
    <div v-else-if="taskList.length > 0" class="space-y-2"
      v-for="todo in taskList" :key="todo.id" >
      <div>{{ todo.title }}</div>
    </div>

    <!-- 空の状態 -->
    <Card v-else class="text-center py-8">
      <CardContent>
        <div class="text-muted-foreground">
          <p class="text-lg font-medium mb-2">TODOがありません</p>
          <p class="text-sm">新しいTODOを追加してみましょう</p>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useTaskStore } from '@/stores/taskStore'
import { Card, CardContent } from '@/components/ui/card'

const taskStore = useTaskStore()
const { taskList, loading } = storeToRefs(taskStore)

const { fetchTasks } = taskStore


// 初期データ読み込み
onMounted(() => {
  fetchTasks()
})
</script>
