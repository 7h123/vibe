import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://server-gamma-murex-45.vercel.app/api',
})

export const getProducts = (params) => API.get('/products', { params });
export const getProduct = (slug) => API.get(`/products/${slug}`);
export const getCategories = (params) => API.get('/categories', { params });
export const submitOrder = (data) => API.post('/orders', data);
export const submitDevis = (data) => API.post('/devis', data);
export const submitContact = (data) => API.post('/contact', data);
