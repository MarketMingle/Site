let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add to Cart Functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const productCard = button.closest('.product-card');
    const product = {
      id: productCard.dataset.productId,
      name: productCard.querySelector('h3').textContent,
      price: parseFloat(productCard.querySelector('.price').textContent.replace('$', '')),
      quantity: 1,
      image: productCard.querySelector('img').src,
      vendor: productCard.querySelector('.vendor').textContent
    };

    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showSuccessMessage();
  });
});

// Show Success Message
function showSuccessMessage() {
  const successMessage = document.getElementById('success-message');
  successMessage.style.display = 'block';
  setTimeout(() => {
    successMessage.style.display = 'none';
  }, 2000);
}

// Update Cart Count
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('.cart-count').forEach(el => el.textContent = count);
}

// Initialize Cart Count
updateCartCount();

// script.js updates
function renderCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const tbody = document.querySelector('#cart-table tbody');
  const cartCount = document.querySelector('.cart-count');
  let total = 0;

  tbody.innerHTML = '';

  cart.forEach((item, index) => {
    const row = document.createElement('tr');
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    row.innerHTML = `
            <td data-label="Product">${item.name}</td>
            <td data-label="Price">$${item.price.toFixed(2)}</td>
            <td data-label="Quantity">${item.quantity}</td>
            <td data-label="Total">$${itemTotal.toFixed(2)}</td>
        `;
    tbody.appendChild(row);
  });

  // Update cart count
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  cartCount.textContent = itemCount;

  // Update total display
  document.querySelector('#cart-total').textContent = total.toFixed(2);
}

function proceedToCheckout() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  window.location.href = 'checkout.html';
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('cart.html')) {
    renderCart();
  }
});

function emptyCart() {
  localStorage.removeItem('cart');
  cart = [];
  renderCart();
  updateCartCount();
  alert('Cart has been emptied successfully!');
}
function createOrder(customerInfo) {
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  const newOrder = {
    id: 'ORD' + Date.now().toString().slice(-6),
    date: new Date().toISOString(),
    status: 'ordered',
    updated: new Date().toISOString(),
    items: JSON.parse(localStorage.getItem('cart')),
    customerInfo: customerInfo
  };

  orders.push(newOrder);
  localStorage.setItem('orders', JSON.stringify(orders));
  localStorage.removeItem('cart');
  return newOrder.id;
}