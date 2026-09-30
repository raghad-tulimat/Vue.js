import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CartItem } from './cartStore'

export interface Order {
  id: number
  date: string
  items: CartItem[]
  total: number
  status: string
}

export const useOrdersStore = defineStore('orders', () => {
  const orders = ref<Order[]>(
    JSON.parse(localStorage.getItem('orders') || '[]')
  )

  const ordersCount = computed(() => orders.value.length)

  const totalSpent = computed(() => {
    return orders.value.reduce((sum, order) => sum + order.total, 0)
  })

  const addOrder = (items: CartItem[], total: number) => {
    const newOrder: Order = {
      id: Date.now(),
      date: new Date().toISOString(),
      items: [...items],
      total,
      status: 'قيد المعالجة'
    }

    orders.value.push(newOrder)
    localStorage.setItem('orders', JSON.stringify(orders.value))

    return newOrder
  }

  const clearOrders = () => {
    orders.value = []
    localStorage.removeItem('orders')
  }

  const getOrderById = (id: number) => {
    return orders.value.find(o => o.id === id)
  }

  return {
    orders,
    ordersCount,
    totalSpent,
    addOrder,
    clearOrders,
    getOrderById
  }
})