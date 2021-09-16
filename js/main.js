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
      tabsContainer.querySelector(".active").classList.remove("active", "outer-shadow");
      event.target.classList.add("active", "outer-shadow");
      aboutSection.querySelector(".tab-content.active").classList.remove("active");
      aboutSection.querySelector(target).classList.add("active");
    }
  });
})();
