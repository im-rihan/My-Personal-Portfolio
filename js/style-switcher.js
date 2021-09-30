// Style Toggler Switcheer

const styleToggler = document.querySelector(".style-toggler");
styleToggler.addEventListener("click", () => {
  document.querySelector(".style-switcher").classList.toggle("open");
});

// Hide Style - Switcher on Scroll
window.addEventListener("scroll", () => {
  if (document.querySelector(".style-switcher").classList.contains("open")) {
    document.querySelector(".style-switcher").classList.remove("open");
  }
});

// Color Switcher
const alternatStyles = document.querySelectorAll(".alternate-style");
function setActiveStyle(color) {
  localStorage.setItem("color", color);
  changeColor();
}
function changeColor() {
  alternatStyles.forEach((style) => {
    localStorage.getItem("color") === style.getAttribute("title")
      ? style.removeAttribute("disabled")
      : style.setAttribute("disabled", "true");
  });
}
if (localStorage.getItem("color") !== null) {
  changeColor();
}
// Day Night

const dayNight = document.querySelector(".day-night");

dayNight.addEventListener("click", () => {
  dayNight.querySelector("i").classList.toggle("fa-sun");
  dayNight.querySelector("i").classList.toggle("fa-moon");
  document.body.classList.toggle("dark");
});

window.addEventListener("load", () => {
  if (document.body.classList.contains("dark")) {
    dayNight.querySelector("i").classList.remove("fa-moon");
    dayNight.querySelector("i").classList.add("fa-sun");
  } else {
    dayNight.querySelector("i").classList.remove("fa-sun");
    dayNight.querySelector("i").classList.add("fa-moon");
  }
});
