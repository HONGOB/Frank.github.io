(function () {
  var slides = Array.prototype.slice.call(document.querySelectorAll(".slide"));
  var dotsContainer = document.getElementById("sliderDots");
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  var slider = document.getElementById("heroSlider");
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

  function createNavButtons() {
    var prevButton = document.createElement("button");
    prevButton.type = "button";
    prevButton.className = "slider-nav slider-nav-prev";
    prevButton.setAttribute("aria-label", "上一张幻灯片");
    prevButton.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 19l-7-7 7-7"/></svg>';
    prevButton.addEventListener("click", function () {
      var prevIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(prevIndex);
      restartAutoplay();
    });

    var nextButton = document.createElement("button");
    nextButton.type = "button";
    nextButton.className = "slider-nav slider-nav-next";
    nextButton.setAttribute("aria-label", "下一张幻灯片");
    nextButton.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 5l7 7-7 7"/></svg>';
    nextButton.addEventListener("click", function () {
      nextSlide();
      restartAutoplay();
    });

    slider.appendChild(prevButton);
    slider.appendChild(nextButton);
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

  function setupBackToTop() {
    var backTopBtn = document.querySelector(".back-top");
    if (!backTopBtn) {
      return;
    }
    backTopBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth"
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
    createNavButtons();
    startAutoplay();
  }

  setupMenu();
  setupReveal();
  setupBackToTop();
})();
