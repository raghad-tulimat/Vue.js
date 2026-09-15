<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const router = useRouter()

const signup = () => {
  router.push('/dashboard')
}
</script>

<template>
  <div class="signup">
    <h2>Sign Up</h2>
    <p class="hint">Create your account to get started</p>

    <label>Name</label>
    <input v-model="name" type="text" placeholder="Enter your name" />

    <label>Email</label>
    <input v-model="email" type="email" placeholder="Enter your email" />

    <label>Password</label>
    <input v-model="password" type="password" placeholder="Enter your password" />

    <label>Confirm Password</label>
    <input v-model="confirmPassword" type="password" placeholder="Confirm your password" />

    <button @click="signup">Register</button>

    <p class="footer">Already have an account? <a href="#">Sign in</a></p>
  </div>
</template>

<style scoped>
.signup {
  width: 340px;
  margin: 80px auto;
  padding: 30px 28px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-family: 'Segoe UI', system-ui, sans-serif;
}

h2 {
  margin: 0;
  text-align: center;
  color: #0f172a;
  font-size: 22px;
}

.hint {
  margin: 0 0 14px;
  text-align: center;
  color: #6b7280;
  font-size: 13px;
}

label {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  margin-top: 6px;
}

input {
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

input:focus {
  border-color: #f59e0b;
}

button {
  margin-top: 16px;
  padding: 11px;
  border: none;
  border-radius: 6px;
  background: #f59e0b;
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background: #d97706;
}

.footer {
  margin: 14px 0 0;
  text-align: center;
  font-size: 13px;
  color: #6b7280;
}

.footer a {
  color: #0f172a;
  font-weight: 600;
  text-decoration: none;
}

.footer a:hover {
  color: #f59e0b;
}
</style>