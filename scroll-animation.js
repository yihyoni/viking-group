let distribution = document.querySelector(".distribution-content");
let dining = document.querySelector(".dining-content");
const fadeUps = document.querySelectorAll(".fade-up");

let observer = new IntersectionObserver(
  (e) => {
    e.forEach((entry) => {
      if (entry.isIntersecting) {
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

fadeUps.forEach((element) => {
  observer.observe(element);
});
