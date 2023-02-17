const curYear = document.querySelector(".year");
const currentYear = new Date();
curYear.textContent = currentYear.getFullYear();

///////////////////////////////////////////////////////////
// Make mobile navigation work

const btnNavEl = document.querySelector(".mbl-nav");
const headerEl = document.querySelector(".header");
// const btnBox = document.querySelector(".logo-box");
const navItem = document.querySelector(".nav-item");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

//DROP DOWN MENU
const btnPrimary = document.querySelector(".btn-mobile");

btnPrimary.addEventListener("click", function () {
  headerEl.classList.toggle("drop-open");
});

// DROP DOWN MENU FROM ICON

const downIcon = document.querySelector(".down-icon");

downIcon.addEventListener("click", function () {
  headerEl.classList.toggle("drop-open");
});
// CLOSING DROP DOWN
const dropDown = document.querySelector(".drop-down");
dropDown.addEventListener("click", function () {
  headerEl.classList.toggle("drop-open");
});

// IMAGE ZOOM 1
const previewImg1 = document.querySelector(".prev-1");
const imgBoxFirst = document.querySelector(".img--box-first");

previewImg1.addEventListener("click", function () {
  imgBoxFirst.classList.toggle("zoom");
});
// IMAGE ZOOM 2
const previewImg2 = document.querySelector(".prev-2");
const imgBoxSecond = document.querySelector(".img--box-second");

previewImg2.addEventListener("click", function () {
  imgBoxSecond.classList.toggle("zoom");
});
// IMAGE ZOOM 3
const previewImg3 = document.querySelector(".prev-3");
const imgBoxThird = document.querySelector(".img--box-third");

previewImg3.addEventListener("click", function () {
  imgBoxThird.classList.toggle("zoom");
});

// CLOSE DROP DOWN UPON SCROLL
let lastKnownScrollPosition = 0;
let ticking = false;

function doSomething(scrollPos) {
  // Do something with the scroll position
}

document.addEventListener("scroll", (event) => {
  lastKnownScrollPosition = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(() => {
      doSomething(lastKnownScrollPosition);
      ticking = false;
    });

    ticking = true;
    headerEl.classList.remove("drop-open");
  }
});
// UP TO HERE DROP DOWN SCROLL

// Close mobile naviagtion

//
///////////////////////// try////////////////////
// const btnNavMenu = document.querySelector(".mbl-nav");
// const logoSp = document.querySelector(".logo-box");

// btnNavMenu.addEventListener("click", function () {
//   logoSp.classList.toggle("spin");
// });

// navItem.addEventListener("click", function () {
//   logoSp.classList.toggle("spin");
// });

///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// Smooth scrolling animation

const allLinks = document.querySelectorAll("a[href^='#']");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    const href = link.getAttribute("href");
    e.preventDefault();
    // Scroll back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // Close mobile naviagtion
    if (link.classList.contains("nav-item"))
      headerEl.classList.toggle("nav-open");
    //

    // if (link.classList.contains("btn-primary"))
    //   headerEl.classList.toggle("nav-open");

    // // Close mobile naviagtion for btn
    // if (link.classList.contains("btn-primary"))
    //   headerEl.classList.toggle("nav-open");
    // //

    // // Close mobile naviagtion for btn
    // if (headerEl.classList.contains("nav-open"))
    //   logoSp.classList.toggle("spin");
    // //

    // if (btnBox.classList.contains("logo-box")) logoSp.classList.toggle("spin");
  });
});

///////////////////////////////////////////////////////////
// Sticky navigation

const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);

    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
      headerEl.classList.remove("drop-open");
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
      headerEl.classList.remove("drop-open");
    }
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-120px",
  }
);
obs.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();
