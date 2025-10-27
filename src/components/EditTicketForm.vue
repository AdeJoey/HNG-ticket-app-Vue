<template>
  <form class="ticket-form" @submit.prevent="handleSubmit">
    <input
      type="text"
      v-model="formData.title"
      placeholder="Ticket Title"
      required
    />
    <textarea
      v-model="formData.description"
      placeholder="Description"
      required
    ></textarea>
    <select v-model="formData.status">
      <option value="open">Open</option>
      <option value="in_progress">In Progress</option>
      <option value="closed">Closed</option>
    </select>

    <div class="edit-actions">
      <button type="submit">Save</button>
      <button type="button" class="cancel-btn" @click="emit('cancel')">
        Cancel
      </button>
    </div>
  </form>
</template>

<script setup>
import { reactive } from 'vue'

const props = defineProps({
  ticket: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['save', 'cancel'])

const formData = reactive({
  id: props.ticket.id,
  title: props.ticket.title,
  description: props.ticket.description,
  status: props.ticket.status
})

const handleSubmit = () => {
  emit('save', { ...formData })
}
</script>