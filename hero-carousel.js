// Hero 배경 캐러셀 (무한 루프 복제 방식)

const heroTrack = document.querySelector(".hero-carousel-track");
let slides = Array.from(document.querySelectorAll(".hero-carousel-slide"));
const dots = document.querySelectorAll(".dot");

// ==========================================
// 1. 앞뒤로 가짜 슬라이드(복제본) 만들기
// ==========================================
// 자연스러운 무한 반복을 위해 맨 앞에 '마지막 슬라이드 복사본'을,
// 맨 뒤에 '첫 번째 슬라이드 복사본'을 몰래 붙여둡니다.
// [3번 복사] - [1번 진짜] - [2번 진짜] - [3번 진짜] - [1번 복사]
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

heroTrack.appendChild(firstClone); // 맨 뒤에 1번 복사본 추가
heroTrack.insertBefore(lastClone, slides[0]); // 맨 앞에 3번 복사본 추가

// 가짜 슬라이드까지 포함해서 배열 다시 가져오기 (총 5장이 됨)
slides = Array.from(document.querySelectorAll(".hero-carousel-slide"));

// 늘어난 슬라이드 개수만큼 트랙의 너비도 늘려주기 (5장 * 100vw = 500vw)
heroTrack.style.width = `${slides.length * 100}vw`;

// ==========================================
// 2. 변수 설정
// ==========================================
// 0번: 3번 복사본, 1번: 1번 진짜, 2번: 2번 진짜, ...
let currentIndex = 1; // 맨 처음 보여줄 슬라이드는 '1번 진짜' 이므로 인덱스 1부터 시작!
let isTransitioning = false; // 슬라이드가 넘어가는 도중에 또 넘어가지 않게 막는 자물쇠 역할
let slideInterval;

// 최초 화면을 '1번 진짜' 위치로 셋팅해둠
heroTrack.style.transform = `translateX(${-currentIndex * 100}vw)`;

// ==========================================
// 3. 슬라이드 이동 함수
// ==========================================
const moveToSlide = (index) => {
  if (isTransitioning) return; // 아직 이동 중이면 함수 멈춤 (광클 방지)
  isTransitioning = true; // 이제 이동 시작! 자물쇠 잠금
  currentIndex = index; // 도착할 인덱스로 업데이트

  // 부드럽게 넘어가도록 애니메이션(transition) 켜주고 이동시킴
  heroTrack.style.transition = "transform 0.8s ease";
  heroTrack.style.transform = `translateX(${-currentIndex * 100}vw)`;

  // 아래쪽 점(dot) 표시 업데이트하기
  // 슬라이드 인덱스는 1~3 이지만, 점은 0~2 이므로 -1 을 해줌
  let dotIndex = currentIndex - 1;
  if (currentIndex === 0) dotIndex = dots.length - 1; // 3번 복사본 위치면 -> 점은 마지막 점
  if (currentIndex === slides.length - 1) dotIndex = 0; // 1번 복사본 위치면 -> 점은 첫 번째 점

  dots.forEach((dot) => dot.classList.remove("active"));
  dots[dotIndex].classList.add("active");
};

// ==========================================
// 4. 무한 루프의 핵심! (눈속임 순간이동)
// ==========================================
// 슬라이드가 부드럽게 넘어가는 애니메이션이 끝났을 때(transitionend) 실행됨
heroTrack.addEventListener("transitionend", () => {
  isTransitioning = false; // 이동 끝! 자물쇠 풀기

  // 만약 방금 도착한 곳이 '3번 복사본(맨 앞)' 이라면?
  if (currentIndex === 0) {
    heroTrack.style.transition = "none"; // 애니메이션 끄기! (안 끄면 되돌아가는게 다 보임)
    currentIndex = slides.length - 2; // 진짜 3번 위치로 인덱스 변경
    heroTrack.style.transform = `translateX(${-currentIndex * 100}vw)`; // 눈에 안보이게 순식간에 진짜 3번으로 점프!
  }

  // 만약 방금 도착한 곳이 '1번 복사본(맨 뒤)' 이라면?
  if (currentIndex === slides.length - 1) {
    heroTrack.style.transition = "none"; // 애니메이션 끄기!
    currentIndex = 1; // 진짜 1번 위치로 인덱스 변경
    heroTrack.style.transform = `translateX(${-currentIndex * 100}vw)`; // 눈에 안보이게 순식간에 진짜 1번으로 점프!
  }
});

// ==========================================
// 5. 사용자가 점(dot)을 클릭했을 때
// ==========================================
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    moveToSlide(index + 1); // 점은 0부터, 슬라이드는 1번부터 진짜니까 +1 해서 넘김
    resetInterval(); // 내가 직접 눌렀으니까 2초 카운트 다시 시작 (안그러면 바로 다음걸로 넘어감)
  });
});

// ==========================================
// 6. 2초마다 자동 슬라이드
// ==========================================
const startInterval = () => {
  slideInterval = setInterval(() => {
    moveToSlide(currentIndex + 1); // 오른쪽으로 한 칸씩 이동
  }, 2000);
};

// 사용자가 클릭했을 때 타이머 껐다 켜는 함수
const resetInterval = () => {
  clearInterval(slideInterval);
  startInterval();
};

// 처음 페이지 켰을 때 자동 슬라이드 시작!
startInterval();
