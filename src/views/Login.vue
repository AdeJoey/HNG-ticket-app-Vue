<template>
  <section class="login-container">
    <!-- Animated decorative circles -->
    <div class="circle circle-1 animate-float"></div>
    <div class="circle circle-3 animate-float-x"></div>
    <div class="circle circle-2 animate-float-delayed"></div>

    <div class="login-box">
      <form class="login-form" @submit.prevent="handleSubmit">
        <h2>Login</h2>

        <label>Email</label>
        <input
          type="email"
          v-model="email"
          placeholder="Enter your email"
          required
        />

        <label>Password</label>
        <input
          type="password"
          v-model="password"
          placeholder="Enter your password"
          required
        />

        <p v-if="error" class="error-text">{{ error }}</p>

        <button type="submit" class="btn-hover">Login</button>

        <p style="margin-top: 1rem; font-size: 0.9rem; color: #666">
          Don't have an account?
          <router-link to="/signup" style="color: #ee4266; font-weight: 600">
            Sign up here
          </router-link>
        </p>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { login } = useAuth()

const email = ref('')
const password = ref('')
const error = ref('')

const handleSubmit = () => {
  const success = login(email.value, password.value)
  if (success) {
    router.push('/dashboard')
  } else {
    error.value = 'Invalid credentials. Try testuser@example.com / password123'
  }
}
</script>