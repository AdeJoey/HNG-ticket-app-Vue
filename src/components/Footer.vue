<template>
  <footer class="site-footer">
    <div class="container">
      <p>© {{ currentYear }} Ticket System</p>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>