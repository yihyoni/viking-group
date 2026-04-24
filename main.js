const menuContainer = document.querySelector(".menu-container");
const openBtn = document.querySelector(".menu-logo");
const closeBtn = document.querySelector(".close-button");

// 토글
openBtn.addEventListener("click", () => {
  menuContainer.classList.toggle("is-open");
});

// 닫기
closeBtn.addEventListener("click", () => {
  menuContainer.classList.remove("is-open");
});

