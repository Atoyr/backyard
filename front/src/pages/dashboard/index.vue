<template>
  <div >
    <h1>Hello dashboard page</h1>
    <TaskList />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import TaskList from '@/components/TaskList.vue';

const route = useRoute();


</script>

