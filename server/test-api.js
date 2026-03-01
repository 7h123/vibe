const axios = require('axios');

const baseURL = 'http://localhost:5000/api';
let token = '';

async function runTests() {
    try {
        console.log('--- TESTING PUBLIC ENDPOINTS ---');

        let res = await axios.get(`${baseURL}/products`);
        console.log(`GET /products: ${res.data.length} products`);

        res = await axios.get(`${baseURL}/products?category=${res.data[0].category._id}`);
        console.log(`GET /products?category=... : ${res.data.length} products`);

        res = await axios.get(`${baseURL}/products?featured=true`);
        console.log(`GET /products?featured=true : ${res.data.length} products`);

        res = await axios.get(`${baseURL}/products/table-ronde-travertin-roma`);
        console.log(`GET /products/table-ronde-travertin-roma : ${res.data.name}`);

        res = await axios.get(`${baseURL}/categories`);
        console.log(`GET /categories : ${res.data.length} categories`);

        console.log('\n--- TESTING AUTH & ADMIN ENDPOINTS ---');

        // Use the new credentials
        res = await axios.post(`${baseURL}/auth/login`, {
            username: 'admin@novadesign.ma',
            password: 'NovaAdmin2025!'
        });
        token = res.data.token;
        console.log(`POST /auth/login : OK (Token received)`);

        const config = { headers: { Authorization: `Bearer ${token}` } };

        res = await axios.get(`${baseURL}/products`, config);
        console.log(`GET /admin/products : ${res.data.length} products (Should be hitting the normal /products but with auth header just to check it doesn't fail)`);

        console.log('\nALL TESTS PASSED ✅');
    } catch (error) {
        console.error('\nTEST FAILED ❌');
        console.error(error.response ? error.response.data : error.message);
    }
}

runTests();
