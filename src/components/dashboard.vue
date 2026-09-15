<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Product } from '../types'

const API_URL = 'https://fakestoreapi.com/products'

const allProducts = ref<Product[]>([])
const searchTerm = ref('')
const selectedCategory = ref('all')
const isLoading = ref(false)

const getProducts = async () => {
  isLoading.value = true
  try {
    const response = await fetch(API_URL)
    if (!response.ok) throw new Error('Failed to fetch products')
    allProducts.value = await response.json()
  } catch (error) {
    console.log(error)
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
    <h1 class="page-title">Products</h1>

    <div class="toolbar">
      <input
        v-model="searchTerm"
        type="text"
        class="search"
        placeholder="Search products..."
      />

      <select v-model="selectedCategory" class="filter">
        <option v-for="cat in categories" :key="cat" :value="cat">
          {{ cat === 'all' ? 'All categories' : cat }}
        </option>
      </select>
    </div>

    <p v-if="isLoading" class="status">Loading products...</p>

    <p v-else-if="filteredProducts.length === 0" class="status">
      No products match your search.
    </p>

    <div v-else class="products-grid">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="card"
      >
        <div class="image-wrapper">
          <img :src="product.image" :alt="product.title" />
        </div>

        <div class="content">
          <span class="category">{{ product.category }}</span>

          <h2 class="title">{{ product.title }}</h2>

          <div class="meta">
            <span class="price">${{ product.price.toFixed(2) }}</span>
            <span class="rating">
              ⭐ {{ product.rating.rate }}
              <small>({{ product.rating.count }})</small>
            </span>
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
  display: -webkit-box;
  -webkit-box-orient: vertical;
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
  display: flex;
  align-items: center;
  gap: 4px;
}

.rating small {
  color: #9ca3af;
  font-size: 11px;
}

.description {
  margin: 6px 0 0;
  font-size: 12.5px;
  color: #4b5563;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  padding-top: 8px;
  border-top: 1px dashed #e5e7eb;
}

.status {
  text-align: center;
  color: #6b7280;
  font-size: 15px;
  margin-top: 40px;
}
</style>