<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const isLoading = ref(false)
const errorMsg = ref('')

const router = useRouter()
const authStore = useAuthStore()

const signup = () => {
  errorMsg.value = ''

  if (!name.value || !email.value || !password.value || !confirmPassword.value) {
    errorMsg.value = 'يرجى تعبئة جميع الحقول'
    return
  }

  if (password.value.length < 6) {
    errorMsg.value = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'
    return
  }

  if (password.value !== confirmPassword.value) {
    errorMsg.value = 'كلمتا المرور غير متطابقتين'
    return
  }

  isLoading.value = true

  const result = authStore.signup(name.value, email.value, password.value)

  isLoading.value = false

  if (result.success) {
    router.push('/dashboard')
  } else {
    errorMsg.value = result.message || 'حدث خطأ أثناء إنشاء الحساب'
  }
}
</script>

<template>
  <div class="signup">
    <h2>إنشاء حساب</h2>
    <p class="hint">أنشئ حسابك للبدء</p>

    <label>الاسم</label>
    <input v-model="name" type="text" placeholder="أدخل اسمك" />

    <label>البريد الإلكتروني</label>
    <input v-model="email" type="email" placeholder="أدخل بريدك الإلكتروني" />

    <label>كلمة المرور</label>
    <input v-model="password" type="password" placeholder="أدخل كلمة المرور" />

    <label>تأكيد كلمة المرور</label>
    <input v-model="confirmPassword" type="password" placeholder="أكد كلمة المرور" />

    <p v-if="errorMsg" class="error">{{ errorMsg }}</p>

    <button @click="signup" :disabled="isLoading">
      {{ isLoading ? 'جاري التسجيل...' : 'تسجيل' }}
    </button>

    <p class="footer">
      لديك حساب بالفعل؟
      <router-link to="/login">تسجيل الدخول</router-link>
    </p>
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
  direction: rtl;
}

h2 { margin: 0; text-align: center; color: #0f172a; font-size: 22px; }
.hint { margin: 0 0 14px; text-align: center; color: #6b7280; font-size: 13px; }

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

input:focus { border-color: #f59e0b; }

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

button:hover { background: #d97706; }
button:disabled { opacity: 0.6; cursor: not-allowed; }

.error {
  color: #dc2626;
  font-size: 13px;
  text-align: center;
  margin: 4px 0 0;
}

.footer { margin: 14px 0 0; text-align: center; font-size: 13px; color: #6b7280; }
.footer a { color: #0f172a; font-weight: 600; text-decoration: none; }
.footer a:hover { color: #f59e0b; }
</style>