<template>
  <section class="dashboard-container">
    <!-- Decorative Circles -->
    <div class="circle circle-a"></div>
    <div class="circle circle-b"></div>

    <!-- Header Section -->
    <header class="dashboard-header">
      <h1 class="dashboard-title">Dashboard</h1>
      <p>Manage and track your tickets efficiently</p>
      <p v-if="feedback" class="feedback-text">{{ feedback }}</p>
    </header>

    <!-- Tickets Section -->
    <section class="tickets-section">
      <h2>Manage Tickets</h2>

      <div class="tickets-content">
        <!-- Ticket Form (Left Side) -->
        <div class="ticket-form-container">
          <TicketForm
            v-if="!editingTicket"
            @add-ticket="addTicket"
          />
          <EditTicketForm
            v-else
            :ticket="editingTicket"
            @save="updateTicket"
            @cancel="editingTicket = null"
          />
        </div>

        <!-- Ticket List (Right Side) -->
        <div class="ticket-list">
          <transition-group name="ticket" mode="out-in">
            <TicketCard
              v-for="ticket in tickets"
              :key="ticket.id"
              :ticket="ticket"
              @edit="startEdit(ticket)"
              @delete="deleteTicket(ticket.id)"
            />
            <p
              v-if="tickets.length === 0"
              key="empty"
              class="empty-text"
            >
              No tickets yet. Add one to get started!
            </p>
          </transition-group>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import TicketCard from '../components/TicketCard.vue'
import TicketForm from '../components/TicketForm.vue'
import EditTicketForm from '../components/EditTicketForm.vue'

const tickets = ref([])
const editingTicket = ref(null)
const feedback = ref('')

const addTicket = (newTicket) => {
  const id = Date.now()
  tickets.value.push({ id, ...newTicket })
  showFeedback('✅ Ticket added successfully!')
}

const deleteTicket = (id) => {
  tickets.value = tickets.value.filter(t => t.id !== id)
  showFeedback('🗑️ Ticket deleted.')
}

const startEdit = (ticket) => {
  editingTicket.value = { ...ticket }
}

const updateTicket = (updated) => {
  const index = tickets.value.findIndex(t => t.id === updated.id)
  if (index !== -1) {
    tickets.value[index] = updated
  }
  editingTicket.value = null
  showFeedback('✏️ Ticket updated successfully!')
}

const showFeedback = (msg) => {
  feedback.value = msg
  setTimeout(() => {
    feedback.value = ''
  }, 2500)
}
</script>

<style>
.ticket-enter-active,
.ticket-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.ticket-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.ticket-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>