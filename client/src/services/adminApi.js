import axios from 'axios'

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://server-gamma-murex-45.vercel.app/api',
})

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('nova_admin_token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

// Auth
export const adminLogin = (data) => API.post('/auth/login', data)

// Products
export const adminGetProducts = () => API.get('/products')
export const adminCreateProduct = (formData) => API.post('/products', formData)
export const adminUpdateProduct = (id, formData) => API.put(`/products/${id}`, formData)
export const adminDeleteProduct = (id) => API.delete(`/products/${id}`)

// Categories
export const adminGetCategories = () => API.get('/categories')
export const adminCreateCategory = (formData) => API.post('/categories', formData)
export const adminUpdateCategory = (id, formData) => API.put(`/categories/${id}`, formData)
export const adminDeleteCategory = (id) => API.delete(`/categories/${id}`)

// Orders
export const adminGetOrders = () => API.get('/orders')
export const adminUpdateOrder = (id, data) => API.patch(`/orders/${id}/status`, data)

// Devis
export const adminGetDevis = () => API.get('/devis')
export const adminUpdateDevisStatus = (id, data) => API.patch(`/devis/${id}/status`, data)
