const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let products = [
    { id: 1, name: 'Laptop', price: 999, category: 'Electronics' },
    { id: 2, name: 'Headphones', price: 49, category: 'Electronics' },
    { id: 3, name: 'Notebook', price: 5, category: 'Stationery' }
];

let nextId = 4;

app.get('/api/products', (req, res) => {
    console.log('GET /api/products - Fetching all products');
    res.json({ count: products.length, products });
});

app.get('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    console.log(`GET /api/products/${id} - Fetching product`);

    const product = products.find(p => p.id === id);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
});

app.post('/api/products', (req, res) => {
    const { name, price, category } = req.body;
    console.log('POST /api/products - Creating new product');

    if (!name || price === undefined || !category) {
        return res.status(400).json({ error: 'name, price, and category are required' });
    }

    const newProduct = { id: nextId++, name, price, category };
    products.push(newProduct);
    res.status(201).json({ message: 'Product created', product: newProduct });
});

app.put('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    console.log(`PUT /api/products/${id} - Updating product`);

    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Product not found' });
    }

    const { name, price, category } = req.body;
    if (name) products[index].name = name;
    if (price !== undefined) products[index].price = price;
    if (category) products[index].category = category;

    res.json({ message: 'Product updated', product: products[index] });
});

app.delete('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    console.log(`DELETE /api/products/${id} - Deleting product`);

    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Product not found' });
    }

    const deleted = products.splice(index, 1);
    res.json({ message: 'Product deleted', product: deleted[0] });
});

app.listen(PORT, () => {
    console.log('=================================');
    console.log('  Express REST API Server');
    console.log('=================================');
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Endpoints:');
    console.log('  GET    /api/products');
    console.log('  GET    /api/products/:id');
    console.log('  POST   /api/products');
    console.log('  PUT    /api/products/:id');
    console.log('  DELETE /api/products/:id');
});
