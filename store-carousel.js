// Store 이미지 캐러셀

const storeList = document.querySelector(".list_store");
const storePrevBtn = document.querySelector(".btn-prev");
const storeNextBtn = document.querySelector(".btn-next");
const storeItems = Array.from(storeList.querySelectorAll("div"));

let storeInterval;
let isStoreMoving = false;

const storeStyle = document.createElement("style");
storeStyle.textContent = `
  .list_store {
    position: relative;
    justify-content: center;
    width: 1186px;
    height: 394px;
  }

  .list_store > div {
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

  .list_store > div.is-wrapping {
    transition: opacity 0.25s ease;
    opacity: 0;
  }

  @media (max-width: 1440px) {
    .list_store {
      width: 394px;
      height: 394px;
    }
  }

  @media (max-width: 768px) {
    .list_store {
      width: 240px;
      height: 240px;
    }

    .list_store > div {
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

const storeRoles = ["store-img0", "store-img1", "store-img2"];

const getStoreRole = (item) =>
  storeRoles.find((role) => item.classList.contains(role));

const setStoreRole = (item, role) => {
  item.classList.remove(...storeRoles);
  item.classList.add(role);
};

const rotateStoreRole = (role, direction) => {
  const roleIndex = storeRoles.indexOf(role);

  if (direction === "next") {
    return storeRoles[(roleIndex + 2) % storeRoles.length];
  }

  return storeRoles[(roleIndex + 1) % storeRoles.length];
};

const moveStoreCarousel = (direction) => {
  if (isStoreMoving) return;
  isStoreMoving = true;

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

const moveStoreNext = () => {
  moveStoreCarousel("next");
};

const moveStorePrev = () => {
  moveStoreCarousel("prev");
};

const startStoreInterval = () => {
  storeInterval = setInterval(moveStoreNext, 3000);
};

const resetStoreInterval = () => {
  clearInterval(storeInterval);
  startStoreInterval();
};

storeNextBtn.addEventListener("click", () => {
  moveStoreNext();
  resetStoreInterval();
});

storePrevBtn.addEventListener("click", () => {
  moveStorePrev();
  resetStoreInterval();
});

startStoreInterval();
