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
  "Easybank Landing Page",
  "ROB Monitoring System",
];
const projectDescriptions = [
  "Project 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Project 2: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Project 3: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  "Project 4: Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
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
