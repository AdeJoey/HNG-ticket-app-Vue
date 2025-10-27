<template>
  <section class="login-container">
    <!-- Animated decorative circles -->
    <div class="circle circle-1 animate-float"></div>
    <div class="circle circle-3 animate-float-x"></div>
    <div class="circle circle-2 animate-float-delayed"></div>

    <div class="login-box">
      <form class="login-form" @submit.prevent="handleSubmit">
        <h2>Create Account</h2>

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
          placeholder="Create a password"
          required
        />

        <label>Confirm Password</label>
        <input
          type="password"
          v-model="confirmPassword"
          placeholder="Confirm your password"
          required
        />

        <p v-if="error" class="error-text">{{ error }}</p>

        <button type="submit" class="btn-hover">Sign Up</button>

        <p style="margin-top: 1rem; font-size: 0.9rem; color: #666">
          Already have an account?
          <router-link to="/login" style="color: #ee4266; font-weight: 600">
            Login here
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
const { signup } = useAuth()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')

const handleSubmit = () => {
  error.value = ''

  if (password.value.length < 6) {
    error.value = 'Password must be at least 6 characters long'
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    return
  }

  const success = signup(email.value, password.value)
  if (success) {
    router.push('/dashboard')
  } else {
    error.value = 'Email already exists. Please use a different email.'
  }
}
</script>