"use strict";

window.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".spans"),
    menu1 = document.querySelector(".menu-top"),
    menu2 = document.querySelector(".menu-center"),
    menu3 = document.querySelector(".menu-center2"),
    menu4 = document.querySelector(".menu-bottom"),
    headerMenu = document.querySelector(".header__menu-block");

  menu.addEventListener("click", () => {
    menu.classList.toggle("active");
    menu1.classList.toggle("active");
    menu2.classList.toggle("active");
    menu3.classList.toggle("active");
    menu4.classList.toggle("active");
    headerMenu.classList.toggle("active2");
  });

  const products = [
    {
      id: 1,
      img: "./img/tovars/cordinatsnow.png?text=Товар+1",
      name: "Автомобильная шина TUNGA NordWay 2 175/65/R14 82Q (с шипами)",
      price: "101 600 ₸",
    },
    {
      id: 2,
      img: "./img/tovars/sailun.png?text=Товар+2",
      name: "Автомобильная шина SAILUN Ice Blazer WST3 185/65/R15 92T",
      price: "17 500 ₸",
    },
    {
      id: 3,
      img: "./img/tovars/tovar3.png?text=Товар+3",
      name: "Автомобильная шина TUNGA NordWay 2 175/65/R14 82Q (с шипами)",
      price: "101 600 ₸",
    },
    {
      id: 4,
      img: "./img/tovars/tovar4.png?text=Товар+4",
      name: "Автомобильная шина TUNGA NordWay 2 185/65/R14 86Q (с шипами)",
      price: "70 000 ₸",
    },
    {
      id: 5,
      img: "./img/tovars/cordinatsnow.png?text=Товар+5",
      name: "Автомобильная шина Bridgestone Ice Cruiser 7000",
      price: "90 000 ₸",
    },
    {
      id: 6,
      img: "./img/tovars/sailun.png?text=Товар+6",
      name: "Автомобильная шина Michelin X-Ice North 4",
      price: "120 000 ₸",
    },
    {
      id: 7,
      img: "./img/tovars/tovar3.png?text=Товар+7",
      name: "Автомобильная шина Nokian Hakkapeliitta 9",
      price: "130 000 ₸",
    },
    {
      id: 8,
      img: "./img/tovars/tovar4.png?text=Товар+8",
      name: "Автомобильная шина Gislaved Nord Frost 200",
      price: "95 000 ₸",
    },
    {
      id: 9,
      img: "./img/tovars/cordinatsnow.png?text=Товар+9",
      name: "Автомобильная шина Toyo Observe G3-Ice",
      price: "85 000 ₸",
    },
    {
      id: 10,
      img: "./img/tovars/sailun.png?text=Товар+10",
      name: "Автомобильная шина Continental IceContact 3",
      price: "140 000 ₸",
    },
    {
      id: 11,
      img: "./img/tovars/tovar3.png?text=Товар+11",
      name: "Автомобильная шина Pirelli Ice Zero",
      price: "100 000 ₸",
    },
    {
      id: 12,
      img: "./img/tovars/tovar4.png?text=Товар+12",
      name: "Автомобильная шина Kumho WinterCraft",
      price: "75 000 ₸",
    },
    {
      id: 13,
      img: "./img/tovars/cordinatsnow.png?text=Товар+13",
      name: "Автомобильная шина Hankook i*Pike",
      price: "88 000 ₸",
    },
    {
      id: 14,
      img: "./img/tovars/sailun.png?text=Товар+14",
      name: "Автомобильная шина Yokohama Ice Guard",
      price: "110 000 ₸",
    },
    {
      id: 15,
      img: "./img/tovars/tovar3.png?text=Товар+15",
      name: "Автомобильная шина Cordiant Snow Cross",
      price: "77 000 ₸",
    },
    {
      id: 16,
      img: "./img/tovars/tovar4.png?text=Товар+16",
      name: "Автомобильная шина Viatti Brina",
      price: "65 000 ₸",
    },
  ];

  const track = document.getElementById("slider-track");
  const dotsContainer = document.getElementById("slider-dots");

  let visibleSlides = 4;
  let index = 0;
  let interval;

  function getVisibleSlides() {
    const width = window.innerWidth;
    if (width >= 1200) return 4;
    if (width >= 900) return 3;
    if (width >= 600) return 2;
    return 1;
  }

  function renderCards() {
    track.innerHTML = "";
    products.forEach((product) => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.dataset.id = product.id;
      card.innerHTML = `
      <img class="product-img" src="${product.img}" alt="${product.name}" />
      <div class="product-name">${product.name}</div>
      <div class="product-price">${product.price}  </div>
      <div class="product-btns">
        <button class="buy-button">КУПИТЬ</button>
        <div class="product-btns-img">
          <img src="./img/icon/like.svg" alt="like" />
          <img src="./img/icon/scales.svg" alt="scales" />
        </div>
      </div>
    `;

      card.addEventListener("click", () => {
        window.location.href = `./product.html?id=${product.id}`;
      });

      const buyBtn = card.querySelector(".buy-button");
      buyBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existingItem = cart.find((item) => item.id === product.id);

        if (existingItem) {
          existingItem.qty += 1;
        } else {
          product.qty = 1;
          cart.push(product);
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        window.location.href = "./basket.html";
      });

      const btnIcons = card.querySelector(".product-btns-img");
      btnIcons.addEventListener("click", (e) => {
        e.stopPropagation();
      });

      track.appendChild(card);
    });
  }

  function updateSlider(transition = true) {
    const card = document.querySelector(".product-card");
    if (!card) return;
    const width = card.offsetWidth;
    track.style.transition = transition ? "transform 0.5s ease" : "none";
    track.style.transform = `translateX(-${index * width}px)`;
    updateDots();
  }

  function autoSlide() {
    index = (index + 1) % products.length;
    updateSlider();
  }

  function createDots() {
    dotsContainer.innerHTML = "";
    const groups = Math.ceil(products.length / visibleSlides);
    for (let i = 0; i < groups; i++) {
      const dot = document.createElement("button");
      dot.className = "slider-dot";
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        index = i * visibleSlides;
        updateSlider();
        resetAutoplay();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    const groupIndex = Math.floor(index / visibleSlides);
    document.querySelectorAll(".slider-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === groupIndex);
    });
  }

  function resetAutoplay() {
    clearInterval(interval);
    interval = setInterval(autoSlide, 3000);
  }

  function initSlider() {
    visibleSlides = getVisibleSlides();
    index = 0;
    renderCards();
    createDots();
    updateSlider(false);
    resetAutoplay();
  }

  let startX = 0;
  let isDragging = false;

  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  track.addEventListener("touchend", (e) => {
    if (!isDragging) return;
    const diff = e.changedTouches[0].clientX - startX;
    handleSwipe(diff);
    isDragging = false;
  });

  track.addEventListener("mousedown", (e) => {
    startX = e.clientX;
    isDragging = true;
  });

  track.addEventListener("mouseup", (e) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    handleSwipe(diff);
    isDragging = false;
  });

  function handleSwipe(diff) {
    const threshold = 50;
    if (diff > threshold) {
      index = Math.max(0, index - 1);
      updateSlider();
      resetAutoplay();
    } else if (diff < -threshold) {
      index = (index + 1) % products.length;
      updateSlider();
      resetAutoplay();
    }
  }

  window.addEventListener("load", initSlider);
  window.addEventListener("resize", initSlider);
});
