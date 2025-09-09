'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);



/**
 * header sticky & back top btn active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = function () {
  if (window.scrollY > 150) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", headerActive);

let lastScrolledPos = 0;

const headerSticky = function () {
  if (lastScrolledPos >= window.scrollY) {
    header.classList.remove("header-hide");
  } else {
    header.classList.add("header-hide");
  }

  lastScrolledPos = window.scrollY;
}

addEventOnElem(window, "scroll", headerSticky);



/**
 * scroll reveal effect
 */

const sections = document.querySelectorAll("[data-section]");

const scrollReveal = function () {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].getBoundingClientRect().top < window.innerHeight / 2) {
      sections[i].classList.add("active");
    }
  }
}

scrollReveal();

addEventOnElem(window, "scroll", scrollReveal);

  const countdownElement = document.querySelector('.countdown');

  // Ambil waktu sekarang
  const now = new Date();

  // Buat target waktu: hari ini jam 15:00 WIB (UTC+7)
  const targetTime = new Date();
  targetTime.setHours(15, 0, 0, 0); // jam 15:00:00

  function updateCountdown() {
    const now = new Date();
    const timeLeft = targetTime - now;

    if (timeLeft <= 0) {
      countdownElement.innerHTML = '<span class="time">00</span><span class="time">00</span><span class="time">00</span><span class="time">00</span>';
      return;
    }

    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

    // Karena hanya hitung jam hari ini, kita set hari ke 0
    const spans = countdownElement.querySelectorAll('.time');
    spans[0].textContent = '00'; // hari
    spans[1].textContent = String(hours).padStart(2, '0');
    spans[2].textContent = String(minutes).padStart(2, '0');
    spans[3].textContent = String(seconds).padStart(2, '0');
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();


  const modal = document.getElementById('productModal');
  const closeBtn = modal.querySelector('.close-btn');

  document.querySelectorAll('.product-trigger').forEach(img => {
    img.addEventListener('click', () => {
      const title = img.dataset.title;
      const image = img.dataset.image;
      const oldPrice = img.dataset.oldprice;
      const newPrice = img.dataset.newprice;
      const discount = img.dataset.discount;
      const reviews = img.dataset.reviews;
      const stars = parseInt(img.dataset.stars);

      document.getElementById('modalImage').src = image;
      document.getElementById('modalImage').alt = title;
      document.getElementById('modalTitle').textContent = title;
      document.getElementById('modalOldPrice').textContent = oldPrice;
      document.getElementById('modalNewPrice').textContent = newPrice;
      document.getElementById('modalDiscount').textContent = discount;
      document.getElementById('modalReviews').textContent = reviews;

      const starsContainer = document.getElementById('modalStars');
      starsContainer.innerHTML = '';
      for (let i = 0; i < stars; i++) {
        const starIcon = document.createElement('ion-icon');
        starIcon.setAttribute('name', 'star');
        starIcon.setAttribute('aria-hidden', 'true');
        starsContainer.appendChild(starIcon);
      }

      modal.hidden = false;
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.hidden = true;
  });
