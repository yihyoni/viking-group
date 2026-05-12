// Hero 배경 캐러셀 (무한 루프 복제 방식)
const heroTrack = document.querySelector(".hero-carousel-track");
let slides = Array.from(document.querySelectorAll(".hero-carousel-slide"));
const dotContainer = document.querySelector(".sliders");

// 원본 슬라이드 개수만큼 dot 생성
slides.forEach((_, index) => {
  const dot = document.createElement("span");
  dot.classList.add("dot");

  if (index === 0) {
    dot.classList.add("active");
  }

  dotContainer.appendChild(dot);
});

// 생성된 dot 다시 가져오기
const dots = document.querySelectorAll(".dot");

// 앞뒤로 가짜 슬라이드(복제본) 만들기
const firstClone = slides[0].cloneNode(true); // 맨 뒤 첫번째 슬라이드 복사본

heroTrack.appendChild(firstClone); // 맨 뒤에 1번 복사본 추가

// 가짜 슬라이드까지 포함해서 배열 다시 가져오기
slides = Array.from(document.querySelectorAll(".hero-carousel-slide"));

// 늘어난 슬라이드 개수만큼 트랙의 너비도 늘려줌
heroTrack.style.width = `${slides.length * 100}vw`;

// 현재 구조:  [1] - [2] - [3] - [1 복사본]
let currentIndex = 0; // 맨 처음 보여줄 슬라이드 인덱스
let isTransitioning = false; // 이미지가 움직이지 않는 상태. 클릭 가능 (광클 방지용 변수)
let slideInterval;

// 최초 화면을 슬라이드 1번 이미지로 세팅
heroTrack.style.transform = `translateX(${-currentIndex * 100}vw)`;

// dot active 업데이트 함수
const updateDots = () => {
  let dotIndex = currentIndex;

  if (currentIndex === slides.length - 1) {
    dotIndex = 0;
  }

  dots.forEach((dot) => dot.classList.remove("active"));
  dots[dotIndex].classList.add("active");
};

// 슬라이드 이동 함수
const moveToSlide = (index) => {
  if (isTransitioning) return; // 아직 이동 중(true)이면 함수 멈춤
  isTransitioning = true; // 추가 클릭 방지
  currentIndex = index;

  heroTrack.style.transition = "transform 0.8s ease";
  heroTrack.style.transform = `translateX(${-currentIndex * 100}vw)`;

  updateDots(); // 점 색깔도 바로 업데이트
};

// 슬라이드가 부드럽게 넘어가는 애니메이션이 끝났을 때 실행
heroTrack.addEventListener("transitionend", () => {
  isTransitioning = false; // 이동이 끝난 후 false 처리

  // 1번 복제본에 도착할 경우
  if (currentIndex === slides.length - 1) {
    heroTrack.style.transition = "none"; // 애니메이션 끄기
    currentIndex = 0; // 진짜 1번 이미지 위치로 인덱스 변경
    heroTrack.style.transform = `translateX(${-currentIndex * 100}vw)`; // 눈에 안보이게 1번 이미지(복제본x) 이동
  }
});

// 슬라이드 버튼 클릭했을 때
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    moveToSlide(index); // 점은 0부터, 슬라이드는 1번부터 진짜니까 +1 해서 넘김
    resetInterval(); // 다시 클릭하면 2초 카운트 초기화
  });
});

// 2초마다 자동 슬라이드
const startInterval = () => {
  slideInterval = setInterval(() => {
    moveToSlide(currentIndex + 1); // 1칸씩 다음으로 이동
  }, 2000);
};

// 사용자가 클릭했을 때 슬라이드 이동하고, 타이머 다시 시작
const resetInterval = () => {
  clearInterval(slideInterval);
  startInterval();
};

// 처음 페이지 켰을 때 자동 슬라이드 시작
startInterval();
