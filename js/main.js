const bodyScrowllingToggle = () => {
  document.body.classList.toggle("stop-scrowlling");
};
(() => {
  const humbergeBtn = document.querySelector(".humbergur-btn");
  const navMenu = document.querySelector(".nav-menu");
  const closeNavBtn = navMenu.querySelector(".close-nav-menu");

  humbergeBtn.addEventListener("click", () => {
    navMenu.classList.add("open");
    bodyScrowllingToggle();
  });
  const hideNavMenu = () => {
    navMenu.classList.remove("open");
    fadeOutEffect();
    bodyScrowllingToggle();
  };
  closeNavBtn.addEventListener("click", hideNavMenu);
  const fadeOutEffect = () => {
    document.querySelector(".fade-out-effect").classList.add("active");
    setTimeout(() => {
      document.querySelector(".fade-out-effect").classList.remove("active");
    }, 300);
  };

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("link-item")) {
      if (event.target.hash !== "") {
        event.preventDefault();
        const hash = event.target.hash;
        document.querySelector(".section.active").classList.add("hide");
        document.querySelector(".section.active").classList.remove("active");
        document.querySelector(hash).classList.add("active");
        document.querySelector(hash).classList.remove("hide");
        navMenu
          .querySelector(".active")
          .classList.add("outer-shadow", "hover-in-shadow");
        navMenu
          .querySelector(".active")
          .classList.remove("active", "inner-shadow");

        if (navMenu.classList.contains("open")) {
          event.target.classList.add("active", "inner-shadow");
          event.target.classList.remove("outer-shadow", "hover-in-shadow");
          hideNavMenu();
        } else {
          let navItems = navMenu.querySelectorAll(".link-item");
          navItems.forEach((item) => {
            if (hash === item.hash) {
             item.classList.add("active", "inner-shadow");
             item.classList.remove("outer-shadow", "hover-in-shadow");
            }
          });
          fadeOutEffect();
        }
      }
    }
  });
})();

// about Section tab
(() => {
  const aboutSection = document.querySelector(".about-section");
  const tabsContainer = document.querySelector(".about-tabs");
  tabsContainer.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("tab-item") &&
      !event.target.classList.contains("active")
    ) {
      const target = event.target.getAttribute("data-target");
      tabsContainer
        .querySelector(".active")
        .classList.remove("active", "outer-shadow");
      event.target.classList.add("active", "outer-shadow");
      aboutSection
        .querySelector(".tab-content.active")
        .classList.remove("active");
      aboutSection.querySelector(target).classList.add("active");
    }
  });
})();

/* Portfolio Filter and Portfolio Popup */
(() => {
  const filterContainer = document.querySelector(".portfolio-filter");
  const portfolioItemsContainer = document.querySelector(".portfolio-items");
  const portfolioItems = document.querySelectorAll(".portfolio-item");
  const popup = document.querySelector(".portfolio-popup");
  const prevBtn = document.querySelector(".pp-prev");
  const nextBtn = document.querySelector(".pp-next");
  const closeBtn = document.querySelector(".pp-close");
  const projectDetailsContainer = popup.querySelector(".pp-details");
  const projectDetailsBtn = popup.querySelector(".pp-project-detail-btn");

  let itemIndex, slideIndex, screenshots;

  // Filter PortFolio Items
  filterContainer.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("filter-item") &&
      !event.target.classList.contains("active")
    ) {
      filterContainer
        .querySelector(".active")
        .classList.remove("active", "outer-shadow");
      event.target.classList.add("active", "outer-shadow");
      const target = event.target.getAttribute("data-target");
      portfolioItems.forEach((item) => {
        if (target === item.getAttribute("data-category") || target === "all") {
          item.classList.add("show");
          item.classList.remove("hide");
        } else {
          item.classList.remove("show");
          item.classList.add("hide");
        }
      });
    }
  });

  portfolioItemsContainer.addEventListener("click", (event) => {
    if (event.target.closest(".portfolio-item-inner")) {
      const portfolioItem = event.target.closest(
        ".portfolio-item-inner"
      ).parentElement;
      // console.log(portfolioItem);

      itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(
        portfolioItem
      );
      // console.log(itemIndex);
      screenshots = portfolioItems[itemIndex]
        .querySelector(".portfolio-item-img img")
        .getAttribute("data-screenshots");
      // console.log(screenshots);

      // concerting screenshots in array
      screenshots = screenshots.split(",");
      if (screenshots.length === 1) {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
      } else {
        prevBtn.style.display = "block";
        nextBtn.style.display = "block";
      }
      // console.log(screenshots);
      slideIndex = 0;
      popupToggle();
      popupUpSlideShow();
      popupDetails();
    }
  });

  const popupToggle = () => {
    popup.classList.toggle("open");
    bodyScrowllingToggle();
  };

  const popupUpSlideShow = () => {
    const imgSrc = screenshots[slideIndex];
    // console.log(imgSrc);
    const popUpImg = popup.querySelector(".pp-img");
    popup.querySelector(".pp-loader").classList.add("active");
    // console.log((popUpImg.src = imgSrc));
    popUpImg.src = imgSrc;
    popUpImg.onload = () => {
      popup.querySelector(".pp-loader").classList.remove("active");
    };
    popup.querySelector(".pp-counter").innerHTML =
      slideIndex + 1 + " of " + screenshots.length;
  };

  closeBtn.addEventListener("click", () => {
    popupToggle();
    if (projectDetailsContainer.classList.contains("active")) {
      popupDetailsToggle();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (slideIndex === screenshots.length - 1) {
      slideIndex = 0;
    } else {
      slideIndex++;
    }
    popupUpSlideShow();
  });

  prevBtn.addEventListener("click", () => {
    if (slideIndex === 0) {
      slideIndex = screenshots.length - 1;
    } else {
      slideIndex--;
    }
    popupUpSlideShow();
  });

  projectDetailsBtn.addEventListener("click", () => {
    popupDetailsToggle();
  });

  const popupDetailsToggle = () => {
    if (projectDetailsContainer.classList.contains("active")) {
      projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
      projectDetailsBtn.querySelector("i").classList.add("fa-plus");

      projectDetailsContainer.classList.remove("active");
      projectDetailsContainer.style.maxHeight = 0 + "px";
    } else {
      projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
      projectDetailsBtn.querySelector("i").classList.add("fa-minus");

      projectDetailsContainer.classList.add("active");
      projectDetailsContainer.style.maxHeight =
        projectDetailsContainer.scrollHeight + "px";
      popup.scrollTo(0, projectDetailsContainer.offsetTop);
    }
  };

  const popupDetails = () => {
    if (!portfolioItems[itemIndex].querySelector(".portfolio-item-details")) {
      projectDetailsBtn.style.display = "none";
      return;
    }
    projectDetailsBtn.style.display = "block";
    const details = portfolioItems[itemIndex].querySelector(
      ".portfolio-item-details"
    ).innerHTML;
    popup.querySelector(".pp-project-details").innerHTML = details;
    const title = portfolioItems[itemIndex].querySelector(
      ".portfolio-item-title"
    ).innerHTML;
    popup.querySelector(".pp-title h2").innerHTML = title;
    const category = portfolioItems[itemIndex].getAttribute("data-category");
    popup.querySelector(".pp-project-category").innerHTML = category
      .split("-")
      .join(" ");
  };
})();

// Testimonial Section
(() => {
  const sliderContainer = document.querySelector(".testi-slider-container");
  const slides = sliderContainer.querySelectorAll(".testi-item");
  const slideWidth = sliderContainer.offsetWidth;
  const prevBtn = document.querySelector(".testi-slider-nav .prev");
  const nextBtn = document.querySelector(".testi-slider-nav .next");
  const activeSlide = sliderContainer.querySelector(".testi-item.active");
  let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(
    activeSlide
  );
  // console.log(slideIndex);

  slides.forEach((slide) => {
    slide.style.width = slideWidth + "px";
  });
  sliderContainer.style.width = slideWidth * slides.length + "px";

  const slider = () => {
    sliderContainer
      .querySelector(".testi-item.active")
      .classList.remove("active");
    slides[slideIndex].classList.add("active");
    sliderContainer.style.marginLeft = -(slideWidth * slideIndex) + "px";
  };

  nextBtn.addEventListener("click", () => {
    if (slideIndex === slides.length - 1) {
      slideIndex = 0;
    } else {
      slideIndex++;
    }
    slider();
  });
  prevBtn.addEventListener("click", () => {
    if (slideIndex === 0) {
      slideIndex = slides.length - 1;
    } else {
      slideIndex--;
    }
    slider();
  });
})();

// Hide all section except active
(() => {
  const sections = document.querySelectorAll(".section");
  // console.log(sections);
  sections.forEach((section) => {
    if (!section.classList.contains("active")) {
      section.classList.add("hide");
    }
  });
})();
