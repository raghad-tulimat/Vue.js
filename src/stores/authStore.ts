import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface User {
  id: number
  name: string
  email: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(
    JSON.parse(localStorage.getItem('currentUser') || 'null')
  )
  const token = ref<string>(localStorage.getItem('token') || '')

  const isLoggedIn = computed(() => !!token.value)

  const signup = (name: string, email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')

    const exists = users.find((u: any) => u.email === email)
    if (exists) {
      return { success: false, message: 'البريد الإلكتروني مسجل مسبقاً' }
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password
    }

    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))

    user.value = { id: newUser.id, name: newUser.name, email: newUser.email }
    token.value = 'token-' + newUser.id

    localStorage.setItem('currentUser', JSON.stringify(user.value))
    localStorage.setItem('token', token.value)

    return { success: true }
  }

  const login = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const found = users.find(
      (u: any) => u.email === email && u.password === password
    )

    if (!found) {
      return { success: false, message: 'البريد أو كلمة المرور غير صحيحة' }
    }

    user.value = { id: found.id, name: found.name, email: found.email }
    token.value = 'token-' + found.id

    localStorage.setItem('currentUser', JSON.stringify(user.value))
    localStorage.setItem('token', token.value)

    return { success: true }
  }

  const logout = () => {
    user.value = null
    token.value = ''
    localStorage.removeItem('currentUser')
    localStorage.removeItem('token')
  }

  return {
    user,
    token,
    isLoggedIn,
    signup,
    login,
    logout
  }
})