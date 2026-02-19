document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('productForm');
    const productId = document.getElementById('productId');
    const productName = document.getElementById('productName');
    const productCategory = document.getElementById('productCategory');
    const productPrice = document.getElementById('productPrice');
    const productStock = document.getElementById('productStock');
    const editIndex = document.getElementById('editIndex');
    const submitBtn = document.getElementById('submitBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const searchCategory = document.getElementById('searchCategory');
    const searchBtn = document.getElementById('searchBtn');
    const resetBtn = document.getElementById('resetBtn');
    const messageDiv = document.getElementById('message');
    const inventoryTableBody = document.getElementById('inventoryTableBody');
    
    let productsData = [];
    let filteredProducts = [];
    
    function showMessage(text, isError) {
        messageDiv.textContent = text;
        messageDiv.style.color = isError ? 'red' : 'green';
        setTimeout(() => messageDiv.textContent = '', 3000);
    }
    
    function validateForm() {
        if (!productId.value || !productName.value || !productCategory.value || !productPrice.value || !productStock.value) {
            showMessage('All fields are required', true);
            return false;
        }
        
        const price = parseFloat(productPrice.value);
        if (isNaN(price) || price <= 0) {
            showMessage('Price must be a positive number', true);
            return false;
        }
        
        const stock = parseInt(productStock.value);
        if (isNaN(stock) || stock < 0) {
            showMessage('Stock must be a non-negative number', true);
            return false;
        }
        
        if (editIndex.value === '-1') {
            const exists = productsData.some(p => p.id === productId.value);
            if (exists) {
                showMessage('Product ID already exists', true);
                return false;
            }
        }
        
        return true;
    }
    
    function loadInventory() {
        fetch('inventory.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load inventory');
                }
                return response.json();
            })
            .then(data => {
                productsData = data.products;
                filteredProducts = [...productsData];
                displayProducts(filteredProducts);
                showMessage('Inventory loaded successfully', false);
            })
            .catch(error => {
                inventoryTableBody.innerHTML = '<tr><td colspan="7">Error loading inventory</td></tr>';
                showMessage('Error: ' + error.message, true);
            });
    }
    
    function displayProducts(products) {
        if (products.length === 0) {
            inventoryTableBody.innerHTML = '<tr><td colspan="7">No products found</td></tr>';
            return;
        }
        
        let html = '';
        products.forEach((product, index) => {
            const totalValue = (product.price * product.stock).toFixed(2);
            const stockClass = product.stock < 10 ? 'low-stock' : (product.stock > 50 ? 'high-stock' : '');
            
            const originalIndex = productsData.findIndex(p => p.id === product.id);
            
            html += `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.category}</td>
                    <td>$${product.price}</td>
                    <td class="${stockClass}">${product.stock}</td>
                    <td>$${totalValue}</td>
                    <td>
                        <button class="action-btn edit-btn" onclick="editProduct('${product.id}')">Edit</button>
                        <button class="action-btn delete-btn" onclick="deleteProduct('${product.id}')">Delete</button>
                    </td>
                </tr>
            `;
        });
        inventoryTableBody.innerHTML = html;
    }
    
    window.editProduct = function(id) {
        const product = productsData.find(p => p.id === id);
        const index = productsData.findIndex(p => p.id === id);
        
        productId.value = product.id;
        productName.value = product.name;
        productCategory.value = product.category;
        productPrice.value = product.price;
        productStock.value = product.stock;
        editIndex.value = index;
        submitBtn.textContent = 'Update Product';
        cancelBtn.style.display = 'block';
    };
    
    window.deleteProduct = function(id) {
        if (!confirm('Delete this product?')) return;
        
        const index = productsData.findIndex(p => p.id === id);
        productsData.splice(index, 1);
        filteredProducts = [...productsData];
        displayProducts(filteredProducts);
        showMessage('Product deleted', false);
    };
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        const product = {
            id: productId.value,
            name: productName.value,
            category: productCategory.value,
            price: parseFloat(productPrice.value),
            stock: parseInt(productStock.value)
        };
        
        if (editIndex.value === '-1') {
            productsData.push(product);
            showMessage('Product added', false);
        } else {
            productsData[editIndex.value] = product;
            showMessage('Product updated', false);
        }
        
        filteredProducts = [...productsData];
        displayProducts(filteredProducts);
        form.reset();
        editIndex.value = '-1';
        submitBtn.textContent = 'Add Product';
        cancelBtn.style.display = 'none';
    });
    
    cancelBtn.addEventListener('click', function() {
        form.reset();
        editIndex.value = '-1';
        submitBtn.textContent = 'Add Product';
        cancelBtn.style.display = 'none';
    });
    
    searchBtn.addEventListener('click', function() {
        const category = searchCategory.value.trim().toLowerCase();
        
        if (category === '') {
            showMessage('Please enter a category', true);
            return;
        }
        
        filteredProducts = productsData.filter(p => 
            p.category.toLowerCase().includes(category)
        );
        
        displayProducts(filteredProducts);
        
        if (filteredProducts.length === 0) {
            showMessage('No products found in this category', true);
        }
    });
    
    resetBtn.addEventListener('click', function() {
        filteredProducts = [...productsData];
        displayProducts(filteredProducts);
        searchCategory.value = '';
        showMessage('Showing all products', false);
    });
    
    cancelBtn.style.display = 'none';
    loadInventory();
});