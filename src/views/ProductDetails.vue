<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductsStore } from '../stores/productsStore'
import { useCartStore } from '../stores/cartStore'
import type { Product } from '../types'

const route = useRoute()
const router = useRouter()
const productsStore = useProductsStore()
const cartStore = useCartStore()

const product = ref<Product | null>(null)
const isLoading = ref(false)
const errorMsg = ref('')
const added = ref(false)

let addedTimer: ReturnType<typeof setTimeout> | null = null

const getProduct = async () => {
  isLoading.value = true
  errorMsg.value = ''
  product.value = null

  const result = await productsStore.fetchProductById(route.params.id as string)

  if (result) {
    product.value = result
  } else {
    errorMsg.value = 'تعذر تحميل المنتج'
  }

  isLoading.value = false
}

const addToCart = () => {
  if (!product.value) return

  cartStore.addToCart(product.value)

  added.value = true
  if (addedTimer) clearTimeout(addedTimer)
  addedTimer = setTimeout(() => {
    added.value = false
  }, 2000)
}

watch(
  () => route.params.id,
  () => {
    if (route.name === 'ProductDetails') getProduct()
  }
)

onMounted(getProduct)
</script>

<template>
  <div class="details-page">
    <button class="back" @click="router.back()">← رجوع</button>

    <p v-if="isLoading" class="status">جاري التحميل...</p>

    <p v-else-if="errorMsg" class="status error">{{ errorMsg }}</p>

    <div v-else-if="product" class="product-details">
      <div class="image-box">
        <img :src="product.thumbnail" :alt="product.title" />
      </div>

      <div class="info">
        <span class="category">{{ product.category }}</span>
        <h1 class="title">{{ product.title }}</h1>

        <p class="description">{{ product.description }}</p>

        <div class="meta">
          <span class="price">${{ product.price.toFixed(2) }}</span>
          <span class="rating">⭐ {{ product.rating }}</span>
        </div>

        <button class="add-btn" @click="addToCart">
          {{ added ? 'تمت الإضافة ✓' : 'أضف إلى السلة' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.details-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 30px 20px;
  font-family: 'Segoe UI', system-ui, sans-serif;
  direction: rtl;
}

.back {
  border: none;
  background: transparent;
  color: #0f172a;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 20px;
  padding: 6px 10px;
  border-radius: 6px;
  transition: background 0.2s;
}

.back:hover {
  background: #f3f4f6;
}

.product-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 30px;
}

.image-box {
  background: #f9fafb;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  min-height: 320px;
}

.image-box img {
  max-width: 100%;
  max-height: 320px;
  object-fit: contain;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.category {
  align-self: flex-start;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  color: #b45309;
  background: #fef3c7;
  padding: 4px 10px;
  border-radius: 999px;
}

.title {
  margin: 0;
  font-size: 22px;
  color: #0f172a;
  line-height: 1.4;
}

.description {
  margin: 0;
  color: #4b5563;
  font-size: 14px;
  line-height: 1.7;
}

.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px dashed #e5e7eb;
}

.price {
  font-size: 24px;
  font-weight: 700;
  color: #f59e0b;
}

.rating {
  font-size: 14px;
  color: #374151;
}

.add-btn {
  margin-top: 10px;
  padding: 13px;
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

.add-btn:hover {
  background: #d97706;
}

.status {
  text-align: center;
  color: #6b7280;
  font-size: 15px;
  margin-top: 60px;
}

.status.error {
  color: #dc2626;
}

@media (max-width: 700px) {
  .product-details {
    grid-template-columns: 1fr;
    padding: 20px;
  }
}
</style>