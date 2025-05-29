<script setup lang="ts">
import { useRoute } from 'vue-router';
import { Button } from '@/components/ui/button';
import ButtonX from '@/components/ButtonX.vue';

const route = useRoute();
</script>

<template>
  <div >
    <h1>Hello todos page</h1>
    <Button>TEST BUTTON</Button>
    <Button variant="destructive">TEST DENGER</Button>
    <ButtonX>TEST BUTTON</ButtonX>
    <ButtonX variant="destructive">TEST DENGER</ButtonX>
  </div>
</template>
