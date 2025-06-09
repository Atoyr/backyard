<template>
  <div class="task-item" :class="{ completed: task.completed }">
    <div class="task-content">
      <div class="task-header">
        <h3 class="task-title">{{ task.title }}</h3>
      </div>
      
      <p v-if="task.description" class="task-description">
        {{ task.description }}
      </p>
      
      <div class="task-meta">
        <span class="task-date">
          作成日: {{ formatDate(task.createdAt) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const formatDate = (dateString?: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('ja-JP')
}
</script>

