(function () {
  var slides = Array.prototype.slice.call(document.querySelectorAll(".slide"));
  var dotsContainer = document.getElementById("sliderDots");
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  var currentIndex = 0;
  var sliderTimer = null;

  function createDots() {
    slides.forEach(function (_, index) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "slider-dot" + (index === 0 ? " active" : "");
      button.setAttribute("aria-label", "切换到第 " + (index + 1) + " 张幻灯片");
      button.addEventListener("click", function () {
        showSlide(index);
        restartAutoplay();
      });
      dotsContainer.appendChild(button);
    });
  }

  function showSlide(index) {
    var dots = dotsContainer.querySelectorAll(".slider-dot");
    slides.forEach(function (slide, slideIndex) {
      var isActive = slideIndex === index;
      slide.classList.toggle("active", isActive);
      if (dots[slideIndex]) {
        dots[slideIndex].classList.toggle("active", isActive);
      }
    });
    currentIndex = index;
  }

  function nextSlide() {
    var nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
  }

  function startAutoplay() {
    sliderTimer = window.setInterval(nextSlide, 5000);
  }

  function restartAutoplay() {
    window.clearInterval(sliderTimer);
    startAutoplay();
  }

  function setupMenu() {
    if (!navToggle || !navLinks) {
      return;
    }

    navToggle.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
      });
    });
  }

  function setupReveal() {
    var elements = document.querySelectorAll(".section, .stat-card");

    if (!("IntersectionObserver" in window)) {
      elements.forEach(function (element) {
        element.classList.add("visible");
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15
    });

    elements.forEach(function (element) {
      element.classList.add("reveal");
      observer.observe(element);
    });
  }

  if (slides.length && dotsContainer) {
    createDots();
    startAutoplay();
  }

  setupMenu();
  setupReveal();
})();
