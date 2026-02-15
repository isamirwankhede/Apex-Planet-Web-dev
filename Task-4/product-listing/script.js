    // Product data
const products = [
    { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: 2999, rating: 4.5, image: 'https://images.pexels.com/photos/5269695/pexels-photo-5269695.jpeg', stock: 45 },
    { id: 2, name: 'Smart Watch', category: 'Electronics', price: 8999, rating: 4.8, image: 'https://images.pexels.com/photos/5081914/pexels-photo-5081914.jpeg', stock: 23 },
    { id: 3, name: 'Laptop Backpack', category: 'Accessories', price: 1499, rating: 4.2, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop', stock: 67 },
    { id: 4, name: 'Coffee Maker', category: 'Home & Kitchen', price: 3499, rating: 4.6, image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop', stock: 34 },
    { id: 5, name: 'Yoga Mat', category: 'Sports', price: 999, rating: 4.4, image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop', stock: 89 },
    { id: 6, name: 'Bluetooth Speaker', category: 'Electronics', price: 2499, rating: 4.3, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop', stock: 56 },
    { id: 7, name: 'Running Shoes', category: 'Sports', price: 3999, rating: 4.7, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', stock: 42 },
    { id: 8, name: 'Desk Lamp', category: 'Home & Kitchen', price: 1299, rating: 4.1, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop', stock: 71 },
    { id: 9, name: 'Mechanical Keyboard', category: 'Electronics', price: 4999, rating: 4.9, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop', stock: 28 },
    { id: 10, name: 'Water Bottle', category: 'Sports', price: 599, rating: 4.5, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop', stock: 103 },
    { id: 11, name: 'Cutting Board', category: 'Home & Kitchen', price: 799, rating: 4.3, image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&h=400&fit=crop', stock: 54 },
    { id: 12, name: 'Phone Case', category: 'Accessories', price: 499, rating: 4.0, image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop', stock: 125 }
];

// State
let filters = {
    search: '',
    category: 'All',
    minPrice: 0,
    maxPrice: 10000,
    minRating: 0,
    sortBy: 'featured'
};

// DOM Elements
const searchInput = document.getElementById('searchInput');
const filterToggle = document.getElementById('filterToggle');
const sidebar = document.getElementById('sidebar');
const clearFiltersBtn = document.getElementById('clearFilters');
const categoryRadios = document.querySelectorAll('input[name="category"]');
const ratingRadios = document.querySelectorAll('input[name="rating"]');
const minPriceSlider = document.getElementById('minPrice');
const maxPriceSlider = document.getElementById('maxPrice');
const minPriceValue = document.getElementById('minPriceValue');
const maxPriceValue = document.getElementById('maxPriceValue');
const sortSelect = document.getElementById('sortSelect');
const productsGrid = document.getElementById('productsGrid');
const resultsCount = document.getElementById('resultsCount');
const filterBadge = document.getElementById('filterBadge');

// Event Listeners
searchInput.addEventListener('input', (e) => {
    filters.search = e.target.value;
    updateProducts();
});

filterToggle.addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
});

clearFiltersBtn.addEventListener('click', clearFilters);

categoryRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        filters.category = e.target.value;
        updateProducts();
    });
});

ratingRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        filters.minRating = parseFloat(e.target.value);
        updateProducts();
    });
});

minPriceSlider.addEventListener('input', (e) => {
    const value = parseInt(e.target.value);
    if (value <= filters.maxPrice) {
        filters.minPrice = value;
        minPriceValue.textContent = value;
        updateProducts();
    }
});

maxPriceSlider.addEventListener('input', (e) => {
    const value = parseInt(e.target.value);
    if (value >= filters.minPrice) {
        filters.maxPrice = value;
        maxPriceValue.textContent = value;
        updateProducts();
    }
});

sortSelect.addEventListener('change', (e) => {
    filters.sortBy = e.target.value;
    updateProducts();
});

// Functions
function clearFilters() {
    filters = {
        search: '',
        category: 'All',
        minPrice: 0,
        maxPrice: 10000,
        minRating: 0,
        sortBy: 'featured'
    };
    
    searchInput.value = '';
    document.getElementById('catAll').checked = true;
    document.getElementById('rating0').checked = true;
    minPriceSlider.value = 0;
    maxPriceSlider.value = 10000;
    minPriceValue.textContent = 0;
    maxPriceValue.textContent = 10000;
    sortSelect.value = 'featured';
    
    updateProducts();
}

function filterProducts() {
    return products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(filters.search.toLowerCase());
        const matchesCategory = filters.category === 'All' || product.category === filters.category;
        const matchesPrice = product.price >= filters.minPrice && product.price <= filters.maxPrice;
        const matchesRating = product.rating >= filters.minRating;
        
        return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    });
}

function sortProducts(products) {
    const sorted = [...products];
    
    switch (filters.sortBy) {
        case 'price-low':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sorted.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            sorted.sort((a, b) => b.rating - a.rating);
            break;
        case 'name':
            sorted.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }
    
    return sorted;
}

function updateFilterBadge() {
    let count = 0;
    if (filters.category !== 'All') count++;
    if (filters.minPrice !== 0 || filters.maxPrice !== 10000) count++;
    if (filters.minRating > 0) count++;
    if (filters.search !== '') count++;
    
    if (count > 0) {
        filterBadge.textContent = count;
        filterBadge.style.display = 'inline-block';
    } else {
        filterBadge.style.display = 'none';
    }
}

function renderProducts(products) {
    if (products.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products" style="grid-column: 1 / -1;">
                <div class="no-products-icon">🔍</div>
                <h3>No products found</h3>
                <p>Try adjusting your filters or search query</p>
                <button class="reset-btn" onclick="clearFilters()">Clear all filters</button>
            </div>
        `;
        return;
    }

    productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-category">${product.category}</p>
                <div class="product-rating">
                    <span class="star">⭐</span>
                    <span class="rating-value">${product.rating}</span>
                    <span class="stock-info">(${product.stock} in stock)</span>
                </div>
                <div class="product-footer">
                    <span class="product-price">₹${product.price}</span>
                    <button class="add-to-cart">
                        🛒 Add
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function updateProducts() {
    const filtered = filterProducts();
    const sorted = sortProducts(filtered);
    
    renderProducts(sorted);
    
    const count = sorted.length;
    resultsCount.textContent = `${count} ${count === 1 ? 'product' : 'products'} found`;
    
    updateFilterBadge();
}

// Initial render
updateProducts();
