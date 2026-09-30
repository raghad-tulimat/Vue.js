import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import type { Product } from '../types'

export const useProductsStore = defineStore('products', () => {
  const API_URL = 'https://dummyjson.com/products'

  const allProducts = ref<Product[]>([])
  const searchTerm = ref('')
  const selectedCategory = ref('all')
  const isLoading = ref(false)
  const errorMsg = ref('')

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

  const fetchProducts = async () => {
    if (allProducts.value.length > 0) return

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

  const fetchProductById = async (id: number | string) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`)
      return response.data as Product
    } catch (error) {
      console.log(error)
      return null
    }
  }

  const setSearchTerm = (value: string) => {
    searchTerm.value = value
  }

  const setCategory = (value: string) => {
    selectedCategory.value = value
  }

  return {
    allProducts,
    searchTerm,
    selectedCategory,
    isLoading,
    errorMsg,
    categories,
    filteredProducts,
    fetchProducts,
    fetchProductById,
    setSearchTerm,
    setCategory
  }
})