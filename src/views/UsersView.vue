<script setup lang="ts">
import UserList from '@/components/UserList.vue'
</script>

<template>
  <main class="users-view">
    <UserList />
  </main>
</template>

<style scoped>
.users-view {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
