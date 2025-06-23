document.addEventListener("DOMContentLoaded", () => {
  const cartItemsEl = document.getElementById("cart-items");
  const totalPriceEl = document.getElementById("total-price");
  const checkoutBtn = document.getElementById("checkout-btn");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function formatPrice(str) {
    return Number(str.replace(/[^\d]/g, ""));
  }

  function renderCart() {
    cartItemsEl.innerHTML = "";

    if (cart.length === 0) {
      cartItemsEl.innerHTML = "<p>Ваша корзина пуста.</p>";
      totalPriceEl.textContent = "0 ₸";
      checkoutBtn.style.display = "none";
      return;
    }

    checkoutBtn.style.display = "inline-block";

    cart.forEach((item) => {
      const row = document.createElement("div");
      row.className = "cart-row";

      row.innerHTML = `
      <div class="cart-left">
    <img src="${item.img}" alt="${item.name}">
    <div class="cart-info">
      <h3>${item.name}</h3>
    </div>
  </div>
  <div class="cart-right">
    <div class="price-block">
      <span class="item-price">${item.price} </span>
      <div class="label">цена за 1 шт</div>
    </div>
    <div class="qty-control">
      <button class="decrease">−</button>
      <div class="qty-block">
        <span>${item.qty}</span>
        <div class="label">шт</div>
      </div>
      <button class="increase">+</button>
      <button class="remove">×</button>
    </div>
  </div>
      `;

      row.querySelector(".increase").addEventListener("click", () => {
        item.qty++;
        saveCart();
        renderCart();
      });

      row.querySelector(".decrease").addEventListener("click", () => {
        item.qty--;
        if (item.qty < 1) {
          cart = cart.filter((i) => i.id !== item.id);
        }
        saveCart();
        renderCart();
      });

      row.querySelector(".remove").addEventListener("click", () => {
        cart = cart.filter((i) => i.id !== item.id);
        saveCart();
        renderCart();
      });

      cartItemsEl.appendChild(row);
    });

    const total = cart.reduce((sum, item) => {
      return sum + item.qty * formatPrice(item.price);
    }, 0);

    totalPriceEl.textContent = `${total.toLocaleString()} ₸`;
  }

  checkoutBtn.addEventListener("click", () => {
    alert("Спасибо за заказ!");
    cart = [];
    saveCart();
    renderCart();
  });

  renderCart();
});
