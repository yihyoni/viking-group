const menuContainer = document.querySelector(".menu-container");
const menuContainerMobile = document.querySelector(".menu-container-mobile");
const openBtn = document.querySelector(".menu-logo");
const closeBtnDesktop = document.querySelector(".menu-container .close-button");
const closeBtnMobile = document.querySelector(
  ".menu-container-mobile .close-button",
);

// 메뉴버튼 클릭하면 메뉴 열기 (화면 크기에 따라 다른 메뉴 열림)
// 미디어쿼리 768px 기준

openBtn.addEventListener("click", () => {
  if (window.innerWidth <= 768) {
    // 모바일 메뉴 열기
    menuContainerMobile.classList.toggle("is-open");
    // is-open이 true면 메뉴 열림
    document.body.classList.toggle(
      "no-scroll",
      menuContainerMobile.classList.contains("is-open"),
    ); // is-open 여부 판단해서 바디 스크롤 막음
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

// 모바일 메뉴 내부 토글 버튼 (+/- 버튼)
const toggleBtns = document.querySelectorAll(
  ".menu-container-mobile .toggle-btn",
);

toggleBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const menuColumn = btn.closest(".menu-column");
    const menuList = menuColumn.querySelector(".menu-list");
    const iconPlus = btn.querySelector(".icon-plus");
    const iconMinus = btn.querySelector(".icon-minus");

    // 메뉴 리스트 토글
    if (menuList.style.display === "flex") {
      // 닫기
      menuList.style.display = "none";
      iconPlus.style.display = "block";
      iconMinus.style.display = "none";
    } else {
      // 열기
      menuList.style.display = "flex";
      iconPlus.style.display = "none";
      iconMinus.style.display = "block";
    }
  });
});
