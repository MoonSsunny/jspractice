import "./style.css";

const navElem = document.querySelector("#nav");
const navItems = Array.from(navElem.children);
const contentsElem = document.querySelector("#contents");
const contentItems = Array.from(contentsElem.children);

const scrollSpyObserver = new IntersectionObserver(
  (entries) => {
    console.log("observe");

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // console.log(entry.target);
        // console.log(contentItems.indexOf(entry.target));
        const contentItemsIndex = contentItems.indexOf(entry.target);
        // console.log(navItems[7]);

        // console.log(navItems[contentItems.indexOf(entry.target)]);
        // navItems[contentItemsIndex].classList.add("on");

        for (let i = 0; i < navItems.length; i++) {
          if (navItems[i] === navItems[contentItemsIndex]) {
            const liElem = document.querySelector("li.on");
            liElem.classList.remove("on");
            navItems[contentItemsIndex].classList.add("on");
          }
        }
      }
    });
  },
  {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  }
);

contentItems.forEach((item) => scrollSpyObserver.observe(item));

navElem.addEventListener("click", (e) => {
  const targetElem = e.target;

  // click event
  const liElem = document.querySelector("li.on");
  liElem.classList.remove("on");
  targetElem.parentElement.classList.add("on");

  if (targetElem.tagName === "BUTTON") {
    const targetIndex = navItems.indexOf(targetElem.parentElement);
    contentItems[targetIndex].scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }
});
