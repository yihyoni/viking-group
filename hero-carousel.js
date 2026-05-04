// Hero 배경 캐러셀

const heroTrack = document.querySelector(".hero-carousel-track");
const dots = document.querySelectorAll(".dot");
// const totalSlides = 3; // 총 슬라이드 개수

// 클릭 이벤트 연결
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    heroTrack.style.transform = `translateX(${-index * 100}vw)`;

    // 클릭한 dot 에만 active 부여
    dots.forEach((d) => d.classList.remove("active"));
    dot.classList.add("active");
  });
});
