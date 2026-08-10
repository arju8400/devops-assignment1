// QFD-14 / QFD-6: render restaurant list and menu on the client
async function loadRestaurants() {
  const res = await fetch('/api/restaurants');
  const restaurants = await res.json();
  const app = document.getElementById('app');
  app.innerHTML = restaurants
    .map(r => `<div class="card"><h3>${r.name}</h3><p>${r.cuisine} · ${r.rating}★ · ${r.deliveryTimeMin} min</p></div>`)
    .join('');
}
document.addEventListener('DOMContentLoaded', loadRestaurants);
