const menuContainer = document.querySelector(".menu-container");
const openBtn = document.querySelector(".menu-logo");
const closeBtn = document.querySelector(".close-button");

// 열기
openBtn.addEventListener("click", () => {
  menuContainer.classList.add("is-open");
});

// 닫기
closeBtn.addEventListener("click", () => {
  menuContainer.classList.remove("is-open");
});

