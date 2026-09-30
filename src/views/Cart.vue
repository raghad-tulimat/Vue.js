<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCartStore } from '../stores/cartStore'
import { useOrdersStore } from '../stores/ordersStore'

const router = useRouter()
const cartStore = useCartStore()
const ordersStore = useOrdersStore()

const { items, total, totalItems, isEmpty } = storeToRefs(cartStore)
const isLoading = ref(false)

const checkout = () => {
  if (isEmpty.value) return

  isLoading.value = true

  ordersStore.addOrder(items.value, total.value)
  cartStore.clearCart()

  setTimeout(() => {
    isLoading.value = false
    router.push('/orders')
  }, 500)
}
</script>

<template>
  <div class="cart-page">
    <h1 class="page-title">سلة التسوق</h1>

    <p v-if="isEmpty" class="empty">
      السلة فارغة
      <router-link to="/dashboard" class="link">تسوق الآن</router-link>
    </p>

    <div v-else class="cart-layout">
      <div class="cart-items">
        <div v-for="item in items" :key="item.id" class="cart-item">
          <div class="item-image">
            <img :src="item.image" :alt="item.title" />
          </div>

          <div class="item-info">
            <h3 class="item-title">{{ item.title }}</h3>
            <p class="item-price">${{ item.price.toFixed(2) }}</p>
          </div>

          <div class="item-qty">
            <button class="qty-btn" @click="cartStore.decreaseQty(item.id)">−</button>
            <span class="qty-value">{{ item.quantity }}</span>
            <button class="qty-btn" @click="cartStore.increaseQty(item.id)">+</button>
          </div>

          <div class="item-subtotal">
            ${{ (item.price * item.quantity).toFixed(2) }}
          </div>

          <button class="remove-btn" @click="cartStore.removeItem(item.id)">✕</button>
        </div>

        <button class="clear-btn" @click="cartStore.clearCart">
          حذف كل المنتجات
        </button>
      </div>

      <aside class="summary">
        <h2>ملخص الطلب</h2>

        <div class="summary-row">
          <span>عدد المنتجات</span>
          <span>{{ totalItems }}</span>
        </div>

        <div class="summary-row total">
          <span>المجموع</span>
          <span>${{ total.toFixed(2) }}</span>
        </div>

        <button class="checkout-btn" :disabled="isLoading" @click="checkout">
          {{ isLoading ? 'جاري المعالجة...' : 'إتمام الشراء' }}
        </button>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.cart-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 30px 20px;
  font-family: 'Segoe UI', system-ui, sans-serif;
  direction: rtl;
}

.page-title {
  text-align: center;
  color: #0f172a;
  margin-bottom: 30px;
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

.cart-layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 24px;
  align-items: start;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cart-item {
  display: grid;
  grid-template-columns: 80px 1fr auto auto auto;
  gap: 16px;
  align-items: center;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 12px 16px;
}

.item-image {
  width: 80px;
  height: 80px;
  background: #f9fafb;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
}

.item-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.item-info { min-width: 0; }

.item-title {
  margin: 0 0 6px;
  font-size: 14px;
  color: #0f172a;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.item-price {
  margin: 0;
  font-size: 13px;
  color: #6b7280;
}

.item-qty {
  display: flex;
  align-items: center;
  gap: 8px;
}

.qty-btn {
  width: 28px;
  height: 28px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: #fff;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  transition: all 0.2s;
}

.qty-btn:hover {
  background: #f59e0b;
  color: #fff;
  border-color: #f59e0b;
}

.qty-value {
  min-width: 24px;
  text-align: center;
  font-weight: 600;
}

.item-subtotal {
  font-weight: 700;
  color: #f59e0b;
  font-size: 15px;
}

.remove-btn {
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  color: #9ca3af;
  cursor: pointer;
  font-size: 16px;
  border-radius: 6px;
  transition: all 0.2s;
}

.remove-btn:hover {
  background: #fee2e2;
  color: #dc2626;
}

.clear-btn {
  align-self: flex-start;
  margin-top: 8px;
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

.summary {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 20px;
  position: sticky;
  top: 20px;
}

.summary h2 {
  margin: 0 0 16px;
  font-size: 18px;
  color: #0f172a;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 14px;
  color: #4b5563;
}

.summary-row.total {
  border-top: 1px dashed #e5e7eb;
  margin-top: 8px;
  padding-top: 14px;
  font-size: 17px;
  font-weight: 700;
  color: #0f172a;
}

.checkout-btn {
  width: 100%;
  margin-top: 16px;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: #f59e0b;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  font-family: inherit;
}

.checkout-btn:hover:not(:disabled) {
  background: #d97706;
}

.checkout-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 800px) {
  .cart-layout {
    grid-template-columns: 1fr;
  }
  .cart-item {
    grid-template-columns: 60px 1fr;
    grid-template-areas:
      "img info"
      "qty qty"
      "sub remove";
  }
  .item-image { grid-area: img; width: 60px; height: 60px; }
  .item-info { grid-area: info; }
  .item-qty { grid-area: qty; justify-content: flex-start; margin-top: 8px; }
  .item-subtotal { grid-area: sub; }
  .remove-btn { grid-area: remove; justify-self: end; }
}
</style>