import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Product } from '../types'

export interface CartItem {
  id: number
  title: string
  price: number
  image: string
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>(
    JSON.parse(localStorage.getItem('cart') || '[]')
  )

  const total = computed(() => {
    return items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  })

  const totalItems = computed(() => {
    return items.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  const isEmpty = computed(() => items.value.length === 0)

  const addToCart = (product: Product) => {
    const existing = items.value.find(i => i.id === product.id)

    if (existing) {
      existing.quantity += 1
    } else {
      items.value.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.thumbnail,
        quantity: 1
      })
    }
  }

  const increaseQty = (id: number) => {
    const item = items.value.find(i => i.id === id)
    if (item) item.quantity += 1
  }

  const decreaseQty = (id: number) => {
    const item = items.value.find(i => i.id === id)
    if (item && item.quantity > 1) item.quantity -= 1
  }

  const removeItem = (id: number) => {
    items.value = items.value.filter(i => i.id !== id)
  }

  const clearCart = () => {
    items.value = []
  }

  watch(
    items,
    (newItems) => {
      localStorage.setItem('cart', JSON.stringify(newItems))
    },
    { deep: true }
  )

  return {
    items,
    total,
    totalItems,
    isEmpty,
    addToCart,
    increaseQty,
    decreaseQty,
    removeItem,
    clearCart
  }
})