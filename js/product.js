const products = [
  {
    id: 1,
    img: "/img/tovars/cordinatsnow.png?text=Товар+1",
    name: "Автомобильная шина TUNGA NordWay 2 175/65/R14 82Q (с шипами)",
    price: "101 600 ₸",
  },
  {
    id: 2,
    img: "/img/tovars/sailun.png?text=Товар+2",
    name: "Автомобильная шина SAILUN Ice Blazer WST3 185/65/R15 92T",
    price: "17 500 ₸",
  },
  {
    id: 3,
    img: "/img/tovars/tovar3.png?text=Товар+3",
    name: "Автомобильная шина TUNGA NordWay 2 175/65/R14 82Q (с шипами)",
    price: "101 600 ₸",
  },
  {
    id: 4,
    img: "/img/tovars/tovar4.png?text=Товар+4",
    name: "Автомобильная шина TUNGA NordWay 2 185/65/R14 86Q (с шипами)",
    price: "70 000 ₸",
  },
  {
    id: 5,
    img: "/img/tovars/cordinatsnow.png?text=Товар+5",
    name: "Автомобильная шина Bridgestone Ice Cruiser 7000",
    price: "90 000 ₸",
  },
  {
    id: 6,
    img: "/img/tovars/sailun.png?text=Товар+6",
    name: "Автомобильная шина Michelin X-Ice North 4",
    price: "120 000 ₸",
  },
  {
    id: 7,
    img: "/img/tovars/tovar3.png?text=Товар+7",
    name: "Автомобильная шина Nokian Hakkapeliitta 9",
    price: "130 000 ₸",
  },
  {
    id: 8,
    img: "/img/tovars/tovar4.png?text=Товар+8",
    name: "Автомобильная шина Gislaved Nord Frost 200",
    price: "95 000 ₸",
  },
  {
    id: 9,
    img: "/img/tovars/cordinatsnow.png?text=Товар+9",
    name: "Автомобильная шина Toyo Observe G3-Ice",
    price: "85 000 ₸",
  },
  {
    id: 10,
    img: "/img/tovars/sailun.png?text=Товар+10",
    name: "Автомобильная шина Continental IceContact 3",
    price: "140 000 ₸",
  },
  {
    id: 11,
    img: "/img/tovars/tovar3.png?text=Товар+11",
    name: "Автомобильная шина Pirelli Ice Zero",
    price: "100 000 ₸",
  },
  {
    id: 12,
    img: "/img/tovars/tovar4.png?text=Товар+12",
    name: "Автомобильная шина Kumho WinterCraft",
    price: "75 000 ₸",
  },
  {
    id: 13,
    img: "/img/tovars/cordinatsnow.png?text=Товар+13",
    name: "Автомобильная шина Hankook i*Pike",
    price: "88 000 ₸",
  },
  {
    id: 14,
    img: "/img/tovars/sailun.png?text=Товар+14",
    name: "Автомобильная шина Yokohama Ice Guard",
    price: "110 000 ₸",
  },
  {
    id: 15,
    img: "/img/tovars/tovar3.png?text=Товар+15",
    name: "Автомобильная шина Cordiant Snow Cross",
    price: "77 000 ₸",
  },
  {
    id: 16,
    img: "/img/tovars/tovar4.png?text=Товар+16",
    name: "Автомобильная шина Viatti Brina",
    price: "65 000 ₸",
  },
];

const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));
const product = products.find((p) => p.id === id);

const nameProduct = document.querySelector(".name-product");
const container = document.getElementById("product-detail");

if (product) {
  nameProduct.textContent = product.name;

  container.innerHTML = `
    <div class="product-detail-imgs">
      <div class="product-left-imgs">
        <img src="/img/tovars/long.png" alt="">
        <img src="/img/tovars/long2.png" alt="">
      </div>
      <img src="${product.img}" alt="${product.name}">
    </div>

    <div class="product-info">
      <div class="product-about">
        <div class="product-about-info">
          <div class="product-about-left">
            <h2 class="product-name">${product.name}</h2>
            <p class="product-availability">В наличии</p>
            <p class="product-price">Цена: ${product.price}</p>
          </div>
          <div class="product-about-right">
            <p>Код товара:</p>
            <span>91545391</span>
          </div>
        </div>
      </div>

      <button class="product-btn" id="buy-button">Купить</button>
      <button class="produkt-btn-sec">Купить в 1 клик</button>

      <div class="product-likes-icons">
        <div class="product-likes-icons-left">
          <img src="/img/icon/scales.svg" alt="scales">
          <p>Добавить в сравнение</p>
        </div>
        <div class="product-likes-icons-left">
          <img src="/img/icon/like.svg" alt="like">
          <p>Добавить в избранное</p>
        </div>
      </div>
    </div>
  `;

  document.getElementById("buy-button").addEventListener("click", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.qty += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        img: product.img,
        price: product.price,
        qty: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "/basket.html";
  });
} else {
  container.innerHTML = `<p class="not-found">Товар не найден</p>`;
}

const productCharacteristics = document.querySelectorAll(
  ".product-characteristic"
);

productCharacteristics.forEach((characteristic) => {
  characteristic.addEventListener("click", () => {
    const currentActive = document.querySelector(
      ".product-characteristic.active-characteristics"
    );
    if (currentActive && currentActive !== characteristic) {
      currentActive.classList.remove("active-characteristics");
    }
    characteristic.classList.toggle("active-characteristics");
  });
});
