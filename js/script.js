// Initialize AOS
AOS.init();

// DOM Elements
const loadingScreen = document.getElementById("loading-screen");
const leftBlind = document.querySelector(".left");
const rightBlind = document.querySelector(".right");
const names = document.querySelectorAll(".name");
const tovvyElement = document.querySelector(".tovvy__element");
const heroBox = document.querySelector(".hero__box");
const header = document.querySelector(".header");
const headerDark = document.querySelector(".header__dark");
const starsContainer = document.querySelector(".stars");
const sectionTagline = document.querySelector(".section__tagline");
const taglineTexts = document.querySelectorAll(".tagline__text");
// Mouse Hover

const hoverText = document.querySelector(".hover__text");
const imgBoxes = document.querySelectorAll(".img__box");
const projectTitles = [
  "Omnifood Landing Page",
  "FastCat Booking Website",
  "FastCat Ticketing System",
  "ROB Monitoring System",
];
const projectDescriptions = [
  "Project 1: A personal front-end project that primarily focused in using CSS techniques like Flex and Grid as well as semantic HTML",
  "Project 2: An online booking website developed for Archipelago Philippine Ferries Corporation to enhance user experience and drive modernization.",
  "Project 3: This is an existing ticketing system for Archipelago Philippine Ferries Corporation that was redesigned and redeveloped to provide a better UI/UX while addressing critical issues from both the front-end and back-end. These issues included seat number duplication, slow system response, and missing essential features",
  "Project 4: A Remaining Onboard Monitoring System developed for Archipelago Philippine Ferries Corporation. Used in all of the vessel's owned by the company. It exist to make sure no fraud is commited via manual submission.",
];

const hoverTextDesc = document.querySelector(".hover__text__desc");
const hoverProjTitle = document.querySelector(".hover__text__title");

let isHoverTextVisible = false;

const showHoverText = (index) => {
  if (!isHoverTextVisible) {
    hoverTextDesc.textContent = projectDescriptions[index];
    hoverProjTitle.textContent = projectTitles[index];
    hoverText.style.opacity = 1;
    hoverText.style.transform = "scale(1)";
    isHoverTextVisible = true;
  }
};

const hideHoverText = () => {
  hoverText.style.opacity = 0;
  hoverText.style.transform = "scale(0.8)";
  isHoverTextVisible = false;
};

const updateHoverTextPosition = (e) => {
  const { clientX, clientY } = e;
  hoverText.style.left = `${clientX}px`;
  hoverText.style.top = `${clientY - 30}px`;
};

imgBoxes.forEach((imgBox, index) => {
  imgBox.addEventListener("mouseenter", () => {
    showHoverText(index);
  });

  imgBox.addEventListener("mouseleave", hideHoverText);

  imgBox.addEventListener("mousemove", (e) => {
    if (isHoverTextVisible) {
      updateHoverTextPosition(e);
    }
  });
});

// Mouse hover ends

window.addEventListener("load", initializeAnimation);
document.addEventListener("DOMContentLoaded", initializeEventListeners);

function initializeAnimation() {
  document.querySelector("html").classList.add("no__scroll");
  // delaying animation for 2.5s
  setTimeout(() => {
    console.log("Animating");
    startSlideAnimation();
  }, 2500);
}

function copyOnClick() {
  const email = document.querySelector(".email__address");
  const successClick = document.querySelector(".copied__text");

  const textToCopy = email.textContent;

  const textarea = document.createElement("textarea");
  textarea.value = textToCopy;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);

  // for reset only. for 2 or more clicks
  if (successClick.classList.contains("show")) {
    clearTimeout(successClick.timeoutID); // removing the time out here
    successClick.classList.remove("show");
  }

  successClick.classList.add("show");

  successClick.timeoutID = setTimeout(() => {
    successClick.classList.remove("show");
  }, 5000);
}

function startSlideAnimation() {
  setTimeout(() => {
    leftBlind.classList.add("open");
    rightBlind.classList.add("open");
    tovvyElement.classList.add("close");
    names.forEach((name) => name.classList.add("close"));

    console.log("ADDED");
    heroBox.style.transform = "translateY(0%)";
    heroBox.style.opacity = "100%";
    header.style.transform = "translateY(0%)";
    header.style.opacity = "100%";

    // watch the end of animation to add hide loading screen
    leftBlind.addEventListener("animationend", hideLoadingScreen);
    rightBlind.addEventListener("animationend", hideLoadingScreen);
    document.querySelector("html").classList.remove("no__scroll");
  }, 1000); // delay to start the slide here
}

function hideLoadingScreen() {
  loadingScreen.style.zIndex = "-999";
}

function initializeEventListeners() {
  document
    .querySelector(".header__hamburger")
    .addEventListener("click", openSideBar);
  window.addEventListener("scroll", handleScrollEvents);
  document
    .querySelector(".email__address")
    .addEventListener("click", copyOnClick);
  scrollTagline();
  initializeHeaderDarkModeEvents();
}

function handleScrollEvents() {
  hideHeader();
  addHeaderColor();
  moveStarOnScroll();
}

function initializeHeaderDarkModeEvents() {
  headerDark.addEventListener("mouseover", () => {
    document.querySelector(".section__hero").classList.add("moon__bg");
  });

  headerDark.addEventListener("mouseout", () => {
    document.querySelector(".section__hero").classList.remove("moon__bg");
  });

  headerDark.addEventListener("click", toggleDarkMode);
}

function toggleDarkMode() {
  bodyDark();
  moonIconToggle();
  if (document.body.classList.contains("dark")) {
    setTimeout(createStarsWithDelay, 2000);
  } else {
    removeStars();
  }
}

function openSideBar() {
  const sideBar = document.querySelector(".sidebar__wrapper");
  const headerHamburger = document.querySelector(".header__hamburger");
  sideBar.classList.toggle("open");
  headerHamburger.classList.toggle("close");
}

const closeSideBar = function () {
  const sideBar = document.querySelector(".sidebar__wrapper");
  const headerHamburger = document.querySelector(".header__hamburger");
  sideBar.classList.remove("open");
  headerHamburger.classList.remove("close");
};

function addHeaderColor() {
  const header = document.querySelector(".header");
  if (window.scrollY > 0) {
    header.classList.add("bg__gray");
  } else {
    header.classList.remove("bg__gray");
  }
}

window.addEventListener("scroll", addHeaderColor);

let lastScrollTop = 0;

function hideHeader() {
  const header = document.querySelector("header");
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop) {
    header.style.transform = "translateY(-100%)";
  } else {
    header.style.transform = "translateY(0)";
  }
  lastScrollTop = scrollTop;
}

function bodyDark() {
  document.body.classList.toggle("dark");
}

function scrollTagline() {
  const observer = new IntersectionObserver(changeBackgroundColor, {
    root: null,
    threshold: 0.2,
  });
  observer.observe(sectionTagline);
}

function changeBackgroundColor(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      sectionTagline.style.backgroundColor = "var(--black-color)";
      taglineTexts.forEach((text) => {
        text.style.color = "var(--white-color)";
        if (text.classList.contains("stroke")) {
          text.style.webkitTextStroke = "2px var(--stroke-color)";
        }
      });
    }
  });
}

function createStar() {
  const star = document.createElement("div");
  star.classList.add("star");
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.animationDelay = `${Math.random() * 2}s`;
  starsContainer.appendChild(star);
  starsContainer.classList.toggle(
    "show",
    !starsContainer.classList.contains("show")
  );
}

function createStarsWithDelay() {
  for (let i = 0; i < 20; i++) {
    setTimeout(createStar, i * 100);
  }
}

function removeStars() {
  while (starsContainer.firstChild) {
    starsContainer.removeChild(starsContainer.firstChild);
  }
}

function moveStarOnScroll() {
  const scrollY = window.scrollY;
  starsContainer.style.transform = `translateY(${scrollY * -1.5}px)`;
}

function moonIconToggle() {
  headerDark.classList.add("fade-out");
  setTimeout(() => {
    headerDark.setAttribute(
      "name",
      headerDark.getAttribute("name") === "moon-outline"
        ? "sunny-outline"
        : "moon-outline"
    );
    headerDark.classList.remove("fade-out");
    headerDark.classList.add("fade-in");
    setTimeout(() => {
      headerDark.classList.remove("fade-in");
    }, 300);
  }, 300);
}

document.querySelectorAll(".project__gallery__img").forEach((img) => {
  img.addEventListener("click", function (event) {
    event.stopPropagation();
    this.classList.toggle("open__gallery");
  });
});

document
  .querySelector(".project__icon__close")
  .addEventListener("click", function () {
    document
      .querySelectorAll(".project__gallery__img")
      .forEach((img) => img.classList.remove("open__gallery"));
  });

document.querySelector("body").addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    document.querySelectorAll(".project__gallery__img").forEach((img) => {
      img.classList.remove("open__gallery");
    });
  }
});
document.querySelector(".cover").addEventListener("click", function () {
  document.querySelectorAll(".project__gallery__img").forEach((img) => {
    img.classList.remove("open__gallery");
  });
});

// scrolling part
// const container = document.querySelector(".project__view");

// let isScrolling = false;

// container.addEventListener("wheel", (e) => {
//   e.preventDefault();

//   if (!isScrolling) {
//     isScrolling = true;
//     const scrollSpeed = 30; // Adjust for speed

//     requestAnimationFrame(() => {
//       container.scrollBy({
//         left: e.deltaY * scrollSpeed,
//         behavior: "smooth",
//       });
//       isScrolling = false;
//     });
//   }
// });
// Removing no scroll for hmtl
const removeNoScroll = function () {
  document.querySelector("html").classList.remove("no__scroll");
};
// Adding no scroll for hmtl
const addNoScroll = function () {
  document.querySelector("html").classList.add("no__scroll");
};

const toggleScroll = function () {
  document.querySelector("html").classList.toggle("no__scroll");
};
const removeHeaderColor = function () {
  document.querySelector(".header").classList.remove("bg__gray");
};

document
  .querySelector(".header__hamburger")
  .addEventListener("click", function () {
    toggleScroll();
    // removeHeaderColor();
    addHeaderColor();
  });

document.querySelectorAll(".menu__link").forEach((link) => {
  link.addEventListener("click", function () {
    openSideBar();
    removeNoScroll();
  });
});

document.querySelector("body").addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    removeNoScroll();
    closeSideBar();
    addHeaderColor();
  }
});

console.log(
  "%c Hello there! 🎉 Welcome!! 🚀",
  "background-color: orange; padding: 10px; color: white; font-weight: bold; border-radius: 5px; font-size: 14px;"
);
console.log(
  "%c Feel free to explore, debug, and have fun coding! 😃",
  "background-color: purple; padding: 10px; color: white; font-weight: bold; border-radius: 5px; font-size: 14px;"
);
console.log(
  "%c Remember: Every error is just another step toward mastery. Keep learning and keep coding! 💡💻",
  "background-color: green; padding: 10px; color: white; font-weight: bold; border-radius: 5px; font-size: 14px;"
);
console.log(
  "%c Happy coding! ✨🔥",
  "background-color: blue; padding: 10px; color: white; font-weight: bold; border-radius: 5px; font-size: 14px;"
);
console.log(
  "%c Like what you see? send me an email here: tovvydumaplin@gmail.com",
  "background-color: gray; padding: 10px; color: white; font-weight: bold; border-radius: 5px; font-size: 14px;"
);
console.log(
  "%c Have a great day!",
  "background-color: brown; padding: 10px; color: white; font-weight: bold; border-radius: 5px; font-size: 14px;"
);
