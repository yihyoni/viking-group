// Hero 배경 캐러셀 (무한 루프 복제 방식)
const heroTrack = document.querySelector(".hero-carousel-track");
let slides = Array.from(document.querySelectorAll(".hero-carousel-slide"));
const dots = document.querySelectorAll(".dot");

// 앞뒤로 가짜 슬라이드(복제본) 만들기
// 자연스러운 무한 반복을 위해 맨 앞에 '마지막 슬라이드 복사본', 맨 뒤에 '첫 번째 슬라이드 복사본'

const firstClone = slides[0].cloneNode(true); // 첫번째 슬라이드 복사본
const lastClone = slides[slides.length - 1].cloneNode(true); // 마지막 슬라이드 복사본

heroTrack.appendChild(firstClone); // 맨 뒤에 1번 복사본 추가
heroTrack.insertBefore(lastClone, slides[0]); // 맨 앞에 3번 복사본 추가

// 가짜 슬라이드까지 포함해서 배열 다시 가져오기
slides = Array.from(document.querySelectorAll(".hero-carousel-slide"));

// 늘어난 슬라이드 개수만큼 트랙의 너비도 늘려줌
heroTrack.style.width = `${slides.length * 100}vw`;

// 변수 설정
// 현재 구조: [3 복사본] - [1] - [2] - [3] - [1 복사본]
let currentIndex = 1; // 맨 처음 보여줄 슬라이드는 3번 복사본이 아닌 슬라이드 이미지 1번이므로 인덱스 1부터 시작
let isTransitioning = false; // 클릭 가능 (광클 방지용 변수)
let slideInterval;

// 최초 화면을 슬라이드 1번 이미지로 세팅
heroTrack.style.transform = `translateX(${-currentIndex * 100}vw)`; // 슬라이드 이미지 1번 보이게 -100vw 로 이동

// 슬라이드 이동 함수
const moveToSlide = (index) => {
  if (isTransitioning) return; // 아직 이동 중(true)이면 함수 멈춤
  isTransitioning = true; // 추가 클릭 방지
  currentIndex = index;

  heroTrack.style.transition = "transform 0.8s ease";
  heroTrack.style.transform = `translateX(${-currentIndex * 100}vw)`;
};

// 무한 루프
// 슬라이드가 부드럽게 넘어가는 애니메이션이 끝났을 때 실행
heroTrack.addEventListener("transitionend", () => {
  isTransitioning = false; // 이동이 끝난 후 false 처리

  // 1번 복제본에 도착할 경우
  if (currentIndex === slides.length - 1) {
    heroTrack.style.transition = "none"; // 애니메이션 끄기
    currentIndex = 1; // 진짜 1번 위치로 인덱스 변경
    heroTrack.style.transform = `translateX(${-currentIndex * 100}vw)`; // 눈에 안보이게 진짜 1번 이동
  }
});

// 사용자가 슬라이드 버튼 클릭했을 때
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    moveToSlide(index + 1); // 점은 0부터, 슬라이드는 1번부터 진짜니까 +1 해서 넘김
    resetInterval(); // 내가 직접 눌렀으니까 2초 카운트 다시 시작 (안그러면 바로 다음걸로 넘어감)
  });
});

// 2초마다 자동 슬라이드
const startInterval = () => {
  slideInterval = setInterval(() => {
    moveToSlide(currentIndex + 1);
  }, 2000);
};

// 사용자가 클릭했을 때 슬라이드 이동하고, 타이머 다시 시작
const resetInterval = () => {
  clearInterval(slideInterval);
  startInterval();
};

// 처음 페이지 켰을 때 자동 슬라이드 시작
startInterval();
