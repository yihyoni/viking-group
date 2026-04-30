const menuContainer = document.querySelector(".menu-container");
const menuContainerMobile = document.querySelector(".menu-container-mobile");
const openBtn = document.querySelector(".menu-logo");
const closeBtnDesktop = document.querySelector(".menu-container .close-button");
const closeBtnMobile = document.querySelector(
  ".menu-container-mobile .close-button",
);

// 메뉴 버튼 클릭하면 메뉴 열기 (화면 크기에 따라 다른 메뉴 열림)
// 미디어쿼리 768px 기준

openBtn.addEventListener("click", () => {
  if (window.innerWidth <= 768) {
    // 모바일 메뉴 열기
    menuContainerMobile.classList.toggle("is-open");
    // is-open이 true면 메뉴 열림
    document.body.classList.toggle(
      "no-scroll",
      menuContainerMobile.classList.contains("is-open"),
    ); // is-open 여부 판단해서 메뉴 열렸을 때만 바디 스크롤 막음
  } else {
    // 데스크톱 메뉴 열기
    menuContainer.classList.toggle("is-open");
  }
});

// 데스크톱 메뉴 닫기
closeBtnDesktop.addEventListener("click", () => {
  menuContainer.classList.remove("is-open");
});

// 모바일 메뉴 닫기
closeBtnMobile.addEventListener("click", () => {
  menuContainerMobile.classList.remove("is-open");
  document.body.classList.remove("no-scroll");
});

// 모바일 메뉴 내부 토글 (아코디언)
const toggleBtns = document.querySelectorAll(
  ".menu-container-mobile .toggle-btn",
);

toggleBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const menuColumn = btn.closest(".menu-column");
    const menuList = menuColumn.querySelector(".menu-list");
    const iconPlus = btn.querySelector(".icon-plus");
    const iconMinus = btn.querySelector(".icon-minus");

    const isOpen = menuList.style.display === "flex";

    // 모든 메뉴 닫기
    toggleBtns.forEach((otherBtn) => {
      const otherColumn = otherBtn.closest(".menu-column");
      const otherList = otherColumn.querySelector(".menu-list");
      const otherPlus = otherBtn.querySelector(".icon-plus");
      const otherMinus = otherBtn.querySelector(".icon-minus");

      otherList.style.display = "none";
      otherPlus.style.display = "block";
      otherMinus.style.display = "none";
    });

    // 내가 누른 메뉴가 닫혀있었으면 열기
    if (!isOpen) {
      menuList.style.display = "flex";
      iconPlus.style.display = "none";
      iconMinus.style.display = "block";
    }
  });
});
