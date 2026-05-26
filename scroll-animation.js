let distribution = document.querySelector(".distribution-content");
let dining = document.querySelector(".dining-content");

let observer = new IntersectionObserver(
  (e) => {
    e.forEach((entry) => {
      if (entry.intersectionRatio > 0.4) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.4,
  },
);
observer.observe(distribution);
observer.observe(dining);
