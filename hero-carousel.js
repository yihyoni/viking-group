// Hero 배경 캐러셀

const heroTrack = document.querySelector(".hero-carousel-track");
const dots = document.querySelectorAll(".dot");
// const totalSlides = 3; // 총 슬라이드 개수
let currentIndex = 0; // 지금 몇 번째 슬라이드인지 인덱스로 구별

// 클릭 이벤트 연결
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentIndex = index; // 클릭된 인덱스를 현재 슬라이드에 저장
    heroTrack.style.transform = `translateX(${-index * 100}vw)`;

    // 클릭한 dot 에만 active 부여
    dots.forEach((d) => d.classList.remove("active"));
    dot.classList.add("active");
  });
});

// 2초마다 자동 슬라이드
setInterval(() => {
  currentIndex = (currentIndex + 1) % dots.length; // 나머지값 구해서 인덱스 순환
  heroTrack.style.transform = `translateX(${-currentIndex * 100}vw)`;
  dots.forEach((d) => d.classList.remove("active")); // 모든 dot 에서 active 제거
  dots[currentIndex].classList.add("active");
}, 2000);
