<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useProductsStore } from '../stores/productsStore'
import { useCartStore } from '../stores/cartStore'
import type { Product } from '../types'

defineOptions({ name: 'Dashboard' })

const router = useRouter()
const productsStore = useProductsStore()
const cartStore = useCartStore()

const {
  filteredProducts,
  categories,
  isLoading,
  errorMsg
} = storeToRefs(productsStore)

const searchTerm = ref(productsStore.searchTerm)
const selectedCategory = ref(productsStore.selectedCategory)

watch(searchTerm, (val) => {
  productsStore.setSearchTerm(val)
})

watch(selectedCategory, (val) => {
  productsStore.setCategory(val)
})

const addToCart = (product: Product) => {
  cartStore.addToCart(product)
}

onMounted(() => {
  productsStore.fetchProducts()
})
</script>

<template>
  <div class="dashboard">
    <h1 class="page-title">المنتجات</h1>

    <div class="toolbar">
      <input
        v-model="searchTerm"
        type="text"
        class="search"
        placeholder="ابحث عن منتج..."
      />

      <select v-model="selectedCategory" class="filter">
        <option v-for="cat in categories" :key="cat" :value="cat">
          {{ cat === 'all' ? 'كل الفئات' : cat }}
        </option>
      </select>
    </div>

    <p v-if="isLoading" class="status">جاري التحميل...</p>

    <p v-else-if="errorMsg" class="status error">{{ errorMsg }}</p>

    <p v-else-if="filteredProducts.length === 0" class="status">
      لا توجد منتجات تطابق البحث
    </p>

    <div v-else class="products-grid">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="card"
        @click="router.push(`/products/${product.id}`)"
      >
        <div class="image-wrapper">
          <img :src="product.thumbnail" :alt="product.title" />
        </div>

        <div class="content">
          <span class="category">{{ product.category }}</span>

          <h2 class="title">{{ product.title }}</h2>

          <div class="meta">
            <span class="price">${{ product.price.toFixed(2) }}</span>
            <span class="rating">⭐ {{ product.rating }}</span>
          </div>

          <button class="add-cart-btn" @click.stop="addToCart(product)">
            🛒 أضف للسلة
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  padding: 30px 20px;
  font-family: 'Segoe UI', system-ui, sans-serif;
  background: #f9fafb;
  min-height: 100vh;
}

.page-title {
  text-align: center;
  font-size: 28px;
  color: #0f172a;
  margin: 0 0 24px;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-bottom: 28px;
}

.search,
.filter {
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  background: #fff;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.search {
  width: 280px;
}

.search:focus,
.filter:focus {
  border-color: #f59e0b;
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.15);
}

.products-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 22px;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
}

.card {
  width: 260px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 26px rgba(0, 0, 0, 0.1);
  border-color: #f59e0b;
}

.image-wrapper {
  height: 200px;
  background: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.image-wrapper img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.content {
  padding: 14px 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.category {
  align-self: flex-start;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: #b45309;
  background: #fef3c7;
  padding: 3px 8px;
  border-radius: 999px;
}

.title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
  line-height: 1.35;
  overflow: hidden;
  min-height: 38px;
}

.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2px;
}

.price {
  font-size: 16px;
  font-weight: 700;
  color: #f59e0b;
}

.rating {
  font-size: 12px;
  color: #374151;
}

.add-cart-btn {
  margin-top: 8px;
  padding: 9px;
  border: 1px solid #f59e0b;
  background: #fff;
  color: #f59e0b;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s;
}

.add-cart-btn:hover {
  background: #f59e0b;
  color: #fff;
}

.status {
  text-align: center;
  color: #6b7280;
  font-size: 15px;
  margin-top: 40px;
}

.status.error {
  color: #dc2626;
}
</style>