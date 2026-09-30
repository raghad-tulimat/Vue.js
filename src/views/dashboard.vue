<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { Product } from '../types'
import axios from 'axios'

const API_URL = 'https://dummyjson.com/products'

const router = useRouter()

const allProducts = ref<Product[]>([])
const searchTerm = ref('')
const selectedCategory = ref('all')
const isLoading = ref(false)
const errorMsg = ref('')

const getProducts = async () => {
  isLoading.value = true
  errorMsg.value = ''

  try {
    const response = await axios.get(API_URL)
    allProducts.value = response.data.products
  } catch (error) {
    console.log(error)
    errorMsg.value = 'تعذر تحميل المنتجات'
  } finally {
    isLoading.value = false
  }
}

const categories = computed(() => {
  const set = new Set(allProducts.value.map(p => p.category))
  return ['all', ...set]
})

const filteredProducts = computed(() => {
  const q = searchTerm.value.trim().toLowerCase()
  const cat = selectedCategory.value

  return allProducts.value.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(q)
    const matchesCategory = cat === 'all' || p.category === cat
    return matchesSearch && matchesCategory
  })
})

onMounted(getProducts)
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