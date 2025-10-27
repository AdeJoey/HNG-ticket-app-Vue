<template>
  <div
    class="ticket-card"
    :style="{ borderLeft: '5px solid ' + statusColors[ticket.status] }"
  >
    <h3>{{ ticket.title }}</h3>
    <p>{{ ticket.description }}</p>
    <span
      class="status"
      :style="{ color: statusColors[ticket.status] }"
    >
      {{ ticket.status.replace('_', ' ') }}
    </span>

    <div class="ticket-actions">
      <button
        :aria-label="`Edit ticket ${ticket.title}`"
        @click="emit('edit')"
        class="edit-btn"
      >
        <Edit3 :size="18" />
      </button>
      <button
        :aria-label="`Delete ticket ${ticket.title}`"
        @click="emit('delete')"
        class="delete-btn"
      >
        <Trash2 :size="18" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { Edit3, Trash2 } from 'lucide-vue-next'

const props = defineProps({
  ticket: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['edit', 'delete'])

const statusColors = {
  open: '#4CAF50',
  in_progress: '#FFC107',
  closed: '#9E9E9E'
}
</script>
