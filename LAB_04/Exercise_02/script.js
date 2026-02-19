document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const loader = document.getElementById('loader');
    const errorDiv = document.getElementById('error');
    const resultsDiv = document.getElementById('results');
    
    let searchTimeout;
    const debounceDelay = 500;
    
    searchInput.addEventListener('input', function() {
        const query = this.value.trim();
        
        clearTimeout(searchTimeout);
        errorDiv.innerHTML = '';
        
        if (query === '') {
            resultsDiv.innerHTML = '<p class="hint">Type something to search...</p>';
            return;
        }
        
        loader.style.display = 'block';
        
        searchTimeout = setTimeout(() => {
            searchProducts(query);
        }, debounceDelay);
    });
    
    function searchProducts(query) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'products.json', true);
        
        xhr.onload = function() {
            loader.style.display = 'none';
            
            if (xhr.status === 200) {
                try {
                    const data = JSON.parse(xhr.responseText);
                    const products = data.products;
                    
                    const filteredProducts = products.filter(product => 
                        product.name.toLowerCase().includes(query.toLowerCase())
                    );
                    
                    displayResults(filteredProducts);
                } catch (e) {
                    showError('Error parsing product data');
                }
            } else {
                showError('Failed to load products');
            }
        };
        
        xhr.onerror = function() {
            loader.style.display = 'none';
            showError('Network error - check your connection');
        };
        
        xhr.send();
    }
    
    function displayResults(products) {
        if (products.length === 0) {
            resultsDiv.innerHTML = '<p class="no-results">No products found</p>';
            return;
        }
        
        let html = '';
        products.forEach(product => {
            html += `
                <div class="product">
                    <div class="product-name">${product.name}</div>
                    <div class="product-details">
                        <span class="product-price">$${product.price}</span>
                        <span class="product-category">${product.category}</span>
                    </div>
                </div>
            `;
        });
        
        resultsDiv.innerHTML = html;
    }
    
    function showError(message) {
        errorDiv.innerHTML = message;
        resultsDiv.innerHTML = '<p class="hint">Try searching again</p>';
    }
});