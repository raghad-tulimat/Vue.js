<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const cartCount = ref(0)

const updateCount = () => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')
  cartCount.value = cart.reduce((s: number, i: any) => s + i.quantity, 0)
}

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('currentUser')
  router.push('/login')
}

onMounted(() => {
  updateCount()
  window.addEventListener('cart-updated', updateCount)
})

onUnmounted(() => {
  window.removeEventListener('cart-updated', updateCount)
})
</script>

<template>
  <div class="main-layout">
    <nav class="navbar">
      <div class="nav-right">
        <router-link to="/dashboard" class="brand"> متجري</router-link>
      </div>

      <div class="nav-links">
        <router-link to="/dashboard" class="nav-link">المنتجات</router-link>
        <router-link to="/orders" class="nav-link">طلباتي</router-link>
      </div>

      <div class="nav-left">
        <router-link to="/cart" class="cart-link">
           السلة
          <span v-if="cartCount" class="badge">{{ cartCount }}</span>
        </router-link>

        <button class="logout-btn" @click="logout">خروج</button>
      </div>
    </nav>

    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.main-layout {
  min-height: 100vh;
  background: #f9fafb;
  direction: rtl;
  font-family: 'Segoe UI', system-ui, sans-serif;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 32px;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  position: sticky;
  top: 0;
  z-index: 100;
}

.brand {
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 8px;
}

.nav-link {
  padding: 8px 16px;
  border-radius: 8px;
  color: #4b5563;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
}

.nav-link:hover {
  background: #f3f4f6;
  color: #0f172a;
}

.nav-link.router-link-active {
  background: #fef3c7;
  color: #b45309;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.cart-link {
  position: relative;
  padding: 8px 14px;
  border-radius: 8px;
  text-decoration: none;
  color: #0f172a;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.2s;
}

.cart-link:hover {
  background: #f3f4f6;
}

.badge {
  position: absolute;
  top: -4px;
  left: -4px;
  background: #f59e0b;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 999px;
  min-width: 18px;
  text-align: center;
}

.logout-btn {
  padding: 8px 14px;
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #374151;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s;
}

.logout-btn:hover {
  background: #fee2e2;
  color: #dc2626;
  border-color: #fecaca;
}

.content {
  padding: 30px 20px;
}

@media (max-width: 700px) {
  .navbar {
    padding: 12px 16px;
    flex-wrap: wrap;
    gap: 10px;
  }
  .nav-links {
    order: 3;
    width: 100%;
    justify-content: center;
  }
}
</style>