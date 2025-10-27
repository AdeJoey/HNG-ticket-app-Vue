import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export function useAuth() {
  const isAuthenticated = ref(false)
  const currentUser = ref(null)
  const router = useRouter()

  onMounted(() => {
    checkAuth()
  })

  const checkAuth = () => {
    const token = localStorage.getItem('ticketapp_session')
    if (token === 'true') {
      const user = JSON.parse(localStorage.getItem('ticketapp_user') || '{}')
      isAuthenticated.value = true
      currentUser.value = user
    }
  }

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('ticketapp_users') || '[]')
    
    // Check test user
    if (email === 'testuser@example.com' && password === 'password123') {
      const user = { email }
      isAuthenticated.value = true
      currentUser.value = user
      localStorage.setItem('ticketapp_session', 'true')
      localStorage.setItem('ticketapp_user', JSON.stringify(user))
      return true
    }

    // Check registered users
    const user = users.find(u => u.email === email && u.password === password)
    if (user) {
      isAuthenticated.value = true
      currentUser.value = { email: user.email }
      localStorage.setItem('ticketapp_session', 'true')
      localStorage.setItem('ticketapp_user', JSON.stringify({ email: user.email }))
      return true
    }

    return false
  }

  const signup = (email, password) => {
    const users = JSON.parse(localStorage.getItem('ticketapp_users') || '[]')
    
    if (users.some(u => u.email === email)) {
      return false
    }

    const newUser = { email, password }
    users.push(newUser)
    localStorage.setItem('ticketapp_users', JSON.stringify(users))

    isAuthenticated.value = true
    currentUser.value = { email }
    localStorage.setItem('ticketapp_session', 'true')
    localStorage.setItem('ticketapp_user', JSON.stringify({ email }))
    
    return true
  }

  const logout = () => {
    isAuthenticated.value = false
    currentUser.value = null
    localStorage.removeItem('ticketapp_session')
    localStorage.removeItem('ticketapp_user')
    router.push('/login')
  }

  return {
    isAuthenticated,
    currentUser,
    login,
    signup,
    logout,
    checkAuth
  }
}