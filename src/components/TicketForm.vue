<template>
  <form class="ticket-form" @submit.prevent="handleSubmit">
    <input
      type="text"
      v-model="title"
      placeholder="Ticket title"
      required
    />

    <textarea
      v-model="description"
      placeholder="Ticket description"
      required
    ></textarea>

    <select v-model="status">
      <option value="open">Open</option>
      <option value="in_progress">In Progress</option>
      <option value="closed">Closed</option>
    </select>

    <button type="submit">Add Ticket</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add-ticket'])

const title = ref('')
const description = ref('')
const status = ref('open')

const handleSubmit = () => {
  if (!title.value.trim()) return

  emit('add-ticket', {
    title: title.value,
    description: description.value,
    status: status.value
  })

  // Reset form
  title.value = ''
  description.value = ''
  status.value = 'open'
}
</script>