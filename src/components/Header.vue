<template>
  <header class="site-header">
    <div class="container">
      <h1 class="logo">TicketSys</h1>

      <nav class="site-nav">
        <router-link to="/" @click="closeMenu">Home</router-link>
        <button @click="handleDashboardClick" class="link-btn">
          Dashboard
        </button>
        <button v-if="isAuthenticated" @click="handleLogout" class="logout-btn">
          <LogOut :size="18" /> Logout
        </button>
        <router-link v-else to="/login" @click="closeMenu">Login</router-link>
      </nav>

      <button class="menu-toggle" @click="toggleMenu" aria-label="Toggle menu">
        <X v-if="menuOpen" :size="28" />
        <Menu v-else :size="28" />
      </button>
    </div>

    <transition name="mobile-nav">
      <nav v-if="menuOpen" class="mobile-nav">
        <router-link to="/" @click="closeMenu">Home</router-link>
        <button @click="handleDashboardClick" class="link-btn">Dashboard</button>
        <button v-if="isAuthenticated" @click="handleLogout" class="logout-btn">
          <LogOut :size="18" /> Logout
        </button>
        <router-link v-else to="/login" @click="closeMenu">Login</router-link>
      </nav>
    </transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Menu, X, LogOut } from 'lucide-vue-next'
import { useAuth } from '../composables/useAuth'

const { isAuthenticated, logout } = useAuth()
const router = useRouter()
const menuOpen = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const closeMenu = () => {
  menuOpen.value = false
}

const handleLogout = () => {
  logout()
  closeMenu()
}

const handleDashboardClick = () => {
  closeMenu()
  if (isAuthenticated.value) {
    router.push('/dashboard')
  } else {
    router.push('/login')
  }
}
</script>

<style>
.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.mobile-nav-enter-from,
.mobile-nav-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>