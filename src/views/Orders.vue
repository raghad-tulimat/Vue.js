<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface OrderItem {
  id: number
  title: string
  price: number
  image: string
  quantity: number
}

interface Order {
  id: number
  date: string
  items: OrderItem[]
  total: number
  status: string
}

const orders = ref<Order[]>([])

const loadOrders = () => {
  orders.value = JSON.parse(localStorage.getItem('orders') || '[]')
  orders.value.reverse()
}

const formatDate = (iso: string) => {
  const d = new Date(iso)
  return d.toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const clearOrders = () => {
  if (!confirm('هل أنت متأكد من حذف كل الطلبات؟')) return
  localStorage.removeItem('orders')
  orders.value = []
}

onMounted(loadOrders)
</script>

<template>
  <div class="orders-page">
    <div class="header">
      <h1 class="page-title">طلباتي</h1>
      <button v-if="orders.length" class="clear-btn" @click="clearOrders">
        حذف كل الطلبات
      </button>
    </div>

    <p v-if="orders.length === 0" class="empty">
      لا توجد طلبات بعد
      <router-link to="/dashboard" class="link">تسوق الآن</router-link>
    </p>

    <div v-else class="orders-list">
      <div v-for="order in orders" :key="order.id" class="order-card">
        <div class="order-header">
          <div>
            <span class="order-date">{{ formatDate(order.date) }}</span>
          </div>
          <span class="order-status">{{ order.status }}</span>
        </div>

        <div class="order-items">
          <div v-for="item in order.items" :key="item.id" class="order-item">
            <div class="item-image">
              <img :src="item.image" :alt="item.title" />
            </div>
            <div class="item-info">
              <p class="item-title">{{ item.title }}</p>
              <p class="item-meta">
                ${{ item.price.toFixed(2) }} × {{ item.quantity }}
              </p>
            </div>
            <div class="item-subtotal">
              ${{ (item.price * item.quantity).toFixed(2) }}
            </div>
          </div>
        </div>

        <div class="order-footer">
          <span>المجموع:</span>
          <span class="order-total">${{ order.total.toFixed(2) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.orders-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 30px 20px;
  font-family: 'Segoe UI', system-ui, sans-serif;
  direction: rtl;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.page-title {
  margin: 0;
  color: #0f172a;
  font-size: 26px;
}

.clear-btn {
  padding: 8px 14px;
  border: 1px solid #dc2626;
  background: transparent;
  color: #dc2626;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}

.clear-btn:hover {
  background: #dc2626;
  color: #fff;
}

.empty {
  text-align: center;
  color: #6b7280;
  font-size: 16px;
  margin-top: 60px;
}

.link {
  display: block;
  margin-top: 12px;
  color: #f59e0b;
  font-weight: 600;
  text-decoration: none;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.order-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 18px 20px;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 14px;
  border-bottom: 1px dashed #e5e7eb;
  margin-bottom: 14px;
}

.order-id {
  font-weight: 700;
  color: #0f172a;
  font-size: 14px;
  margin-left: 10px;
}

.order-date {
  font-size: 12px;
  color: #6b7280;
}

.order-status {
  font-size: 12px;
  font-weight: 600;
  color: #b45309;
  background: #fef3c7;
  padding: 4px 10px;
  border-radius: 999px;
}

.order-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.order-item {
  display: grid;
  grid-template-columns: 60px 1fr auto;
  gap: 12px;
  align-items: center;
}

.item-image {
  width: 60px;
  height: 60px;
  background: #f9fafb;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
}

.item-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.item-title {
  margin: 0 0 4px;
  font-size: 13px;
  color: #0f172a;
}

.item-meta {
  margin: 0;
  font-size: 12px;
  color: #6b7280;
}

.item-subtotal {
  font-weight: 700;
  color: #f59e0b;
  font-size: 14px;
}

.order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px dashed #e5e7eb;
  font-size: 15px;
  color: #374151;
}

.order-total {
  font-weight: 700;
  font-size: 18px;
  color: #f59e0b;
}
</style>