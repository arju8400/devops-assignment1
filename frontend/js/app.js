// QuickBite demo frontend — talks to the real backend API on localhost:4000
const API = 'http://localhost:4000/api';
const USER_ID = 1; // demo user (in a full app this comes from login)

let cart = [];
let currentRestaurantId = null;

const restaurantList = document.getElementById('restaurantList');
const menuList = document.getElementById('menuList');
const menuTitle = document.getElementById('menuTitle');
const restaurantView = document.getElementById('restaurantView');
const menuView = document.getElementById('menuView');
const cartPanel = document.getElementById('cartPanel');
const cartItemsEl = document.getElementById('cartItems');
const cartTotalsEl = document.getElementById('cartTotals');
const cartCountEl = document.getElementById('cartCount');
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutResult = document.getElementById('checkoutResult');

async function loadRestaurants() {
  restaurantList.innerHTML = '<p>Loading restaurants…</p>';
  try {
    const res = await fetch(`${API}/restaurants`);
    const restaurants = await res.json();
    restaurantList.innerHTML = restaurants.map(r => `
      <div class="card" onclick="openRestaurant(${r.id}, '${r.name}')">
        <h3>${r.name}</h3>
        <p>${r.cuisine} · ⭐ ${r.rating} · ${r.deliveryTimeMin} min</p>
      </div>
    `).join('');
  } catch (e) {
    restaurantList.innerHTML = `<p style="color:red">Could not reach the API at ${API}. Is the backend running? (npm start in /backend)</p>`;
  }
}

async function openRestaurant(id, name) {
  currentRestaurantId = id;
  menuTitle.textContent = name;
  restaurantView.classList.add('hidden');
  menuView.classList.remove('hidden');
  const res = await fetch(`${API}/menu/${id}`);
  const items = await res.json();
  menuList.innerHTML = items.map(item => `
    <div class="card menu-card">
      <h3>${item.name}</h3>
      <p>${item.veg ? '🟢 Veg' : '🔴 Non-veg'}</p>
      <p class="price">₹${item.price}</p>
      <button ${item.available ? '' : 'disabled'} onclick="addToCart(${item.id}, '${item.name.replace(/'/g, "\\'")}', ${item.price})">
        ${item.available ? 'Add to cart' : 'Unavailable'}
      </button>
    </div>
  `).join('');
}

document.getElementById('backBtn').addEventListener('click', () => {
  menuView.classList.add('hidden');
  restaurantView.classList.remove('hidden');
});

async function addToCart(itemId, name, price) {
  await fetch(`${API}/cart/${USER_ID}/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ itemId, name, price, qty: 1 }),
  });
  await refreshCart();
  cartPanel.classList.remove('hidden');
}
window.addToCart = addToCart;
window.openRestaurant = openRestaurant;

async function refreshCart() {
  const res = await fetch(`${API}/cart/${USER_ID}`);
  cart = await res.json();
  cartCountEl.textContent = cart.reduce((n, i) => n + i.qty, 0);
  renderCart();
}

let lastDiscount = 0;

function renderCart() {
  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<p>Your cart is empty.</p>';
    checkoutBtn.disabled = true;
    cartTotalsEl.innerHTML = '';
    return;
  }
  cartItemsEl.innerHTML = cart.map(i => `
    <div class="cart-line">
      <span>${i.name} × ${i.qty}</span>
      <span>₹${(i.price * i.qty).toFixed(2)}</span>
    </div>
  `).join('');
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  cartTotalsEl.innerHTML = `
    <div class="cart-line"><span>Subtotal</span><span>₹${subtotal.toFixed(2)}</span></div>
    ${lastDiscount ? `<div class="cart-line"><span>Discount</span><span>-₹${lastDiscount.toFixed(2)}</span></div>` : ''}
    <div class="cart-line total"><span>Est. total</span><span>₹${(subtotal - lastDiscount).toFixed(2)}</span></div>
  `;
  checkoutBtn.disabled = false;
}

document.getElementById('cartBtn').addEventListener('click', () => cartPanel.classList.toggle('hidden'));
document.getElementById('closeCart').addEventListener('click', () => cartPanel.classList.add('hidden'));

document.getElementById('applyCoupon').addEventListener('click', async () => {
  const code = document.getElementById('couponCode').value.trim();
  if (!code) return;
  const res = await fetch(`${API}/cart/${USER_ID}/coupon`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  });
  const data = await res.json();
  if (res.ok) {
    lastDiscount = data.subtotal - data.total;
    renderCart();
  } else {
    alert(data.error);
  }
});

checkoutBtn.addEventListener('click', async () => {
  checkoutBtn.disabled = true;
  checkoutBtn.textContent = 'Placing order…';
  const orderRes = await fetch(`${API}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: USER_ID, items: cart, addressId: 1, discount: lastDiscount }),
  });
  const order = await orderRes.json();

  const paymentRes = await fetch(`${API}/payments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderId: order.id, method: 'UPI', amount: order.total }),
  });
  const payment = await paymentRes.json();

  checkoutResult.innerHTML = `
    ✅ Order #${order.id} placed! Total ₹${order.total}.<br/>
    Payment status: <strong>${payment.status}</strong>
  `;
  checkoutBtn.textContent = 'Checkout';
  checkoutBtn.disabled = false;
});

loadRestaurants();
refreshCart();