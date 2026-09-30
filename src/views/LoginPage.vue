<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const username = ref('')
const password = ref('')
const router = useRouter()
const isLoading = ref(false)
const errorMsg = ref('')

const LOGIN_URL = 'https://dummyjson.com/auth/login'

const login = async () => {
  errorMsg.value = ''

  if (!username.value || !password.value) {
    errorMsg.value = 'يرجى إدخال اسم المستخدم وكلمة المرور'
    return
  }

  isLoading.value = true

  try {
    const response = await axios.post(LOGIN_URL, {
      username: username.value,
      password: password.value
    })

    const token = response.data.token || response.data.accessToken
    localStorage.setItem('token', token)

    router.push('/dashboard')
  } catch (error) {
    console.log(error)
    errorMsg.value = 'فشل تسجيل الدخول. يرجى التحقق من بياناتك.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="login">
    <h2>تسجيل الدخول</h2>
    <p class="hint">مرحباً بعودتك إلى متجرنا</p>

    <label>اسم المستخدم</label>
    <input v-model="username" type="text" placeholder="أدخل اسم المستخدم" />

    <label>كلمة المرور</label>
    <input v-model="password" type="password" placeholder="أدخل كلمة المرور" />

    <p v-if="errorMsg" class="error">{{ errorMsg }}</p>

    <button @click="login" :disabled="isLoading">
      {{ isLoading ? 'جاري الدخول...' : 'دخول' }}
    </button>

    <p class="footer">ليس لديك حساب؟ <a href="#">إنشاء حساب</a></p>
  </div>
</template>

<style scoped>
.login {
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
  direction: rtl;
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
  text-align: right;
}

input {
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
  direction: rtl;
  text-align: right;
  font-family: inherit;
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
  font-family: inherit;
}

button:hover {
  background: #d97706;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  color: #dc2626;
  font-size: 13px;
  text-align: center;
  margin: 4px 0 0;
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