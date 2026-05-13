// Store 이미지 캐러셀
const storeList = document.querySelector(".list-store");
const storePrevBtn = document.querySelector(".btn-prev");
const storeNextBtn = document.querySelector(".btn-next");
const storeItems = Array.from(storeList.querySelectorAll("div"));

let storeInterval; // 자동 슬라이드 타이머 저장
let isStoreMoving = false; // 슬라이드 이동 중복 방지(광클방지)

// 캐러셀 전용 스타일을 JS에서 주입
const storeStyle = document.createElement("style");
storeStyle.textContent = `
  .list-store {
    position: relative;
    justify-content: center;
    width: 1186px;
    height: 394px;
  }

  .list-store > div {
    display: block !important;
    position: absolute;
    top: 50%;
    left: 50%;
    transition:
      transform 0.5s ease,
      width 0.5s ease,
      height 0.5s ease,
      filter 0.5s ease,
      opacity 0.5s ease;
  }

  .store-img0 {
    transform: translate(calc(-50% - 433px), -50%);
    z-index: 1;
  }

  .store-img1 {
    transform: translate(-50%, -50%);
    z-index: 2;
  }

  .store-img2 {
    transform: translate(calc(-50% + 433px), -50%);
    z-index: 1;
  }

  .list-store > div.is-wrapping {
    transition: opacity 0.25s ease;
    opacity: 0;
  }

  @media (max-width: 1440px) {
    .list-store {
      width: 394px;
      height: 394px;
    }
  }

  @media (max-width: 768px) {
    .list-store {
      width: 240px;
      height: 240px;
    }

    .list-store > div {
      pointer-events: none;
    }

    .store-img0,
    .store-img2 {
      width: 240px;
      height: 240px;
      opacity: 0;
      filter: none;
    }

    .store-img1 {
      width: 240px;
      height: 240px;
      opacity: 1;
      filter: none;
    }

    .store-img0 {
      transform: translate(calc(-50% - 260px), -50%);
    }

    .store-img2 {
      transform: translate(calc(-50% + 260px), -50%);
    }
  }
`;
document.head.appendChild(storeStyle);

// 각 이미지 박스가 맡을 수 있는 자리 역할: 왼쪽 / 가운데 / 오른쪽
const storeRoles = ["store-img0", "store-img1", "store-img2"];

// 현재 이미지 박스가 어떤 자리 역할을 갖고 있는지 확인
const getStoreRole = (item) =>
  storeRoles.find((role) => item.classList.contains(role));

// 기존 자리 역할을 지우고 새 역할을 부여
const setStoreRole = (item, role) => {
  item.classList.remove(...storeRoles);
  item.classList.add(role);
};

// 방향에 따라 다음 자리 역할을 계산
const rotateStoreRole = (role, direction) => {
  const roleIndex = storeRoles.indexOf(role);

  if (direction === "next") {
    return storeRoles[(roleIndex + 2) % storeRoles.length];
  }

  return storeRoles[(roleIndex + 1) % storeRoles.length];
};

// 실제 캐러셀 이동 처리
const moveStoreCarousel = (direction) => {
  if (isStoreMoving) return;
  isStoreMoving = true;

  // 반대편으로 래핑되는 이미지는 잠깐 숨겨서 어색한 왕복 이동을 줄임
  const wrappingRole = direction === "next" ? "store-img0" : "store-img2";
  const wrappingItem = storeItems.find(
    (item) => getStoreRole(item) === wrappingRole,
  );

  wrappingItem.classList.add("is-wrapping");

  window.setTimeout(() => {
    storeItems.forEach((item) => {
      const currentRole = getStoreRole(item);
      const nextRole = rotateStoreRole(currentRole, direction);
      setStoreRole(item, nextRole);
    });

    window.setTimeout(() => {
      wrappingItem.classList.remove("is-wrapping");
    }, 50);
  }, 250);

  window.setTimeout(() => {
    isStoreMoving = false;
  }, 550);
};

// 다음 / 이전 이동용 래퍼 함수
const moveStoreNext = () => {
  moveStoreCarousel("next");
};

const moveStorePrev = () => {
  moveStoreCarousel("prev");
};

// 자동 슬라이드 시작
const startStoreInterval = () => {
  storeInterval = setInterval(moveStoreNext, 3000);
};

// 버튼 클릭 후 자동 슬라이드 타이머를 다시 시작
const resetStoreInterval = () => {
  clearInterval(storeInterval);
  startStoreInterval();
};

// 좌우 버튼 클릭 이벤트 등록
storeNextBtn.addEventListener("click", () => {
  moveStoreNext();
  resetStoreInterval();
});

storePrevBtn.addEventListener("click", () => {
  moveStorePrev();
  resetStoreInterval();
});

// 페이지 진입 시 자동 슬라이드 시작
startStoreInterval();
