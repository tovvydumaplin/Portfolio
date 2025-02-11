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
  "Project 1: A personal front-end project that primarily focused in using CSS techniques like Flex and Grid as well as semantic HTML",
  "Project 2: An online booking website developed for Archipelago Philippine Ferries Corporation to enhance user experience and drive modernization.",
  "Project 3: A challenge project from Front End Mentor. A landing page created with pure HTML and CSS.",
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

const project = document.querySelectorAll(".project");
console.log(project);

const projects = [
  {
    title: "OmniFood Landing Page",
    subtitle: "Front-end Development",
    sections: [
      {
        heading: "OmniFood Landing Page",
        subheading: "Front-end Development",
        description: `A project from the course I took on Udemy. This is a practice project designed to enhance and improve my knowledge of HTML and CSS. OmniFood is a modern, fully responsive landing page for a food delivery service, showcasing clean layouts, intuitive design, and engaging animations. 
        
        Through this project, I practiced key front-end development skills such as flexbox, CSS grid, and responsive web design techniques. The goal was to create a visually appealing and user-friendly interface while reinforcing my understanding of modern web development best practices.`,

        image: "omnifood.jpg",
      },
      {
        heading: "Technologies",
        subheading: "Used in Development",
        description: `The project is built using HTML, CSS, and JavaScript, but the primary focus is on HTML and CSS to ensure a structured learning path. While JavaScript is included for minor enhancements, the goal is to strengthen my understanding of semantic HTML, modern CSS techniques like flexbox and grid, and responsive design principles. 
        
        This project serves as a hands-on practice to refine my front-end development skills and improve my ability to create visually appealing, well-structured web pages.`,
        image: ["ci4.png", "jquery.png", "css.png", "js.png"],
        techTitle: ["Code Igniter", "Query", "CSS", "JavaScript"],
      },
      {
        heading: "The Development Process",
        subheading: "OmniFood Landing Page",
        description: `This project gave me a solid understanding of semantic HTML and the power of CSS, particularly with flexbox and grid. Initially, positioning random elements was challenging, especially when ensuring full responsiveness across different screen sizes. However, working through these challenges provided me with a new perspective on web development and strengthened my ability to create well-structured, responsive designs.`,
        image: "fastcatbook.jpg",
      },
      {
        heading: "What I Learned",
        subheading: "Personal Growth",
        description: `This project was a significant learning experience that expanded my knowledge of web development. It taught me how to research new technologies, find solutions to challenges, and select libraries that best fit my needs. Overall, it provided me with a strong foundation in front-end development, helping me gain confidence in structuring and styling web pages effectively.

        Completing this project made me feel more comfortable using HTML and CSS. I also challenged myself further by solving problems from <a class="link__page" href="https://www.frontendmentor.io/profile/tovvydumaplin" target="_blank" rel="noopener noreferrer">Frontend Mentor</a> to enhance my skills.`,

        image: "profile.png",
        liveLink: "https://omnifood-tovvy.netlify.app/",
        gitHubLink: "https://github.com/tovvydumaplin/Omnifood",
      },
    ],
  },
  {
    title: "Fastcat Booking Website",
    subtitle: "BACK-END MIGRATION AND FRONT-END DEVELOPMENT",
    sections: [
      {
        heading: "Fastcat Booking Website",
        subheading: "BACK-END MIGRATION AND FRONT-END DEVELOPMENT",
        description: `An online booking website developed for Archipelago Philippine Ferries Corporation to enhance user experience and drive modernization.
        I contributed to the project by migrating back-end functions and developing new features to align with the updated design.
        

        Before the redesign, the booking website faced several challenges that impacted both the user experience and operational efficiency.
        The registration process was cumbersome, resulting in emails being unusable after a failed registration.
        Additionally, the booking pages were confusing for users, making navigation difficult.
      `,

        image: "fastcatbook.jpg",
      },
      {
        heading: "Technologies",
        subheading: "Used in Development",
        description: `The project was built using CodeIgniter 4 as the back-end framework. This framework was chosen for its lightweight structure and ability to easily manage MVC (Model-View-Controller) architecture. On the front end, I integrated jQuery for dynamic form validation and AJAX to enable asynchronous data handling, ensuring smooth, real-time interactions without reloading the page. ion-icons is also used for a quick and easy integration of SVG based icons to modify it easily. `,
        image: ["ci4.png", "jquery.png", "css.png", "js.png"],
        techTitle: ["Code Igniter", "jQuery", "CSS", "JavaScript"],
      },
      {
        heading: "The Impact",
        subheading: "The New Online Booking",
        description: `With the updates, refactoring, and careful selection of libraries, the online booking system’s speed has improved dramatically. Receiving fewer concerns by the day, thus, returning a more direct output which greatly improves the user experience. The registration process has also greatly improved, reducing user errors and getting great feedback from stakeholders.`,
        image: "fastcatbook.jpg",
      },
      {
        heading: "What I Learned",
        subheading: "Personal Growth",
        description: `This project was a significant learning experience for me. It broadened my understanding of back-end development, as I had primarily focused on front-end development before this project. The development process helped me refine my thought process and taught me the importance of balancing functionality, clean code structure, and seeking support within the team. 
        
        
        Overall, I am proud of the contributions I made to the booking system, resulting in a more efficient and user-friendly platform.`,
        image: "profile.png",
        liveLink: "https://fastcat-book.com/",
        gitHubLink: "#",
      },
    ],
  },
  {
    title: "Easy Bank Landing Page",
    subtitle: "Front-end Development",
    sections: [
      {
        heading: "Easy Bank Landing Page",
        subheading: "Front-end Development",
        description: `A practice project taken from Front-end mentor. A modern web page for a digital banking site that primarily focused on the distribution of information to attract consumers.
        

        An Intermediate level project, solely based on front end mentor's details. I selected this project due to its elements. This was during the time I was having a hard time on absolute positioning and making it responsive from big screen sizes to smaller screen sizes.
      `,
        image: "easybank.jpg",
      },
      {
        heading: "Technologies",
        subheading: "Used in Development",
        description: `
        Built with Semantic HTML, modern css techniques such as Flex box, Grid and JavaScript for some DOM manipulations. This project followed a strict color guides based on its design from figma. Staring with layout and positioning of elements to proper typhography.

        The selection of technologies in this project is very limited due to the fact that this is made during practice/learning stage.
      `,
        image: ["ci4.png", "jquery.png", "css.png", "js.png"],
        techTitle: ["Code Igniter", "jQuery", "CSS", "JavaScript"],
      },
      {
        heading: "Purpose and Motivation",
        subheading: "Front-end Development",
        description: `As a beginner, it is truly an amazing task to complete. Learning new techniques, searching for new ideas on how to solve the problem is a really great addition to my knowledge. 
        
        Basically, this project gave me a better view on how to take on a challenge.`,
      },
      {
        heading: "What I Learned",
        subheading: "Personal Growth",
        description: `This project is a really good start for my web development learning journey. It has given me a huge amount of understanding about absolute positioning. Totally learned how to do it the right way.

        But that's not all. During development is where I learned on how to scour for free images that I can use that will fill the gap of what I'm missing, technically, I didn't add to this project because it will bypass the strict rules, but still, learned a new thing from that.
        `,
        image: "profile.png",
        liveLink: "https://fastcat-book.com/",
        gitHubLink: "#",
      },
    ],
  },
  {
    title: "Remaining Onboard Monitoring System",
    subtitle: "Front-end Back-end Development",
    sections: [
      {
        heading: "Remaining Onboard Monitoring System",
        subheading: "Front-end Back-end Development",
        description: `A practice project taken from Front-end mentor. A modern web page for a digital banking site that primarily focused on the distribution of information to attract consumers.
        

        An Intermediate level project, solely based on front end mentor's details. I selected this project due to its elements. This was during the time I was having a hard time on absolute positioning and making it responsive from big screen sizes to smaller screen sizes.
      `,
        image: "rob.jpg",
      },
      {
        heading: "Technologies",
        subheading: "Used in Development",
        description: `
        Built with Semantic HTML, modern css techniques such as Flex box, Grid and JavaScript for some DOM manipulations. This project followed a strict color guides based on its design from figma. Staring with layout and positioning of elements to proper typhography.

        The selection of technologies in this project is very limited due to the fact that this is made during practice/learning stage.
      `,
        image: ["php.png", "jquery.png", "css.png", "js.png"],
        techTitle: ["PHP Core", "jQuery", "CSS", "JavaScript"],
      },
      {
        heading: "Purpose and Motivation",
        subheading: "Front-end Development",
        description: `As a beginner, it is truly an amazing task to complete. Learning new techniques, searching for new ideas on how to solve the problem is a really great addition to my knowledge. 
        
        Basically, this project gave me a better view on how to take on a challenge.`,
      },
      {
        heading: "What I Learned",
        subheading: "Personal Growth",
        description: `This project is a really good start for my web development learning journey. It has given me a huge amount of understanding about absolute positioning. Totally learned how to do it the right way.

        But that's not all. During development is where I learned on how to scour for free images that I can use that will fill the gap of what I'm missing, technically, I didn't add to this project because it will bypass the strict rules, but still, learned a new thing from that.
        `,
        image: "profile.png",
        liveLink: "https://fastcat-book.com/",
        gitHubLink: "#",
      },
    ],
  },
];
// PROJECT SHOWING THE TECHNOLOGIES PART
// Find the project that has the "Technologies" section

function loadProjects(index) {
  const containerDetails = document.querySelectorAll(
    ".project__container__details"
  );
  const project = projects[index]; // Get the selected project

  project.sections.forEach((section, i) => {
    if (containerDetails[i]) {
      // Update heading, subheading, and description
      containerDetails[i].querySelector(".heading__secondary").textContent =
        section.heading;
      containerDetails[i].querySelector(".subheading").textContent =
        section.subheading;
      containerDetails[i].querySelector(".project__desc").innerHTML =
        section.description.replace(/\n/g, "<br>");

      // Update image
      const imgElement = containerDetails[i].querySelector(
        ".project__img__modal"
      );
      if (imgElement && section.image) {
        console.log("Updating image:", section.image); // Debugging
        imgElement.src = `resources/${section.image}`;
      }

      // Set links on buttons
      const liveButton = containerDetails[i].querySelector(
        ".project__btn__primary"
      );
      const gitHubButton = containerDetails[i].querySelector(
        ".project__btn__secondary"
      );

      if (liveButton) {
        // Check if the button exists before modifying
        if (section.liveLink && section.liveLink !== "#") {
          liveButton.href = section.liveLink;
          liveButton.classList.remove("hidden");
        } else {
          liveButton.classList.add("hidden");
        }
      }

      if (gitHubButton) {
        // Check if the button exists before modifying
        if (section.gitHubLink && section.gitHubLink !== "#") {
          gitHubButton.href = section.gitHubLink;
          gitHubButton.classList.remove("hidden");
        } else {
          gitHubButton.classList.add("hidden");
        }
      }
    }
  });
}

document.querySelectorAll(".project").forEach((item, index) => {
  item.addEventListener("click", () => {
    console.log("Project Index Clicked:", index); // Debugging log
    loadProjects(index);
    document.querySelector(".cover").classList.add("open");
    document.querySelector("html").classList.add("no__scroll");
    hideHoverText();

    // Changing the Technologies used section on modal
    // Get the selected project based on index
    const selectedProject = projects[index];

    // Find the "Technologies" section within the selected project
    const techSection = selectedProject.sections.find(
      (section) => section.heading === "Technologies"
    );

    // Get the images and titles from the "Technologies" section
    const techData = techSection ? techSection : { image: [], techTitle: [] };

    // Select all existing <img> elements with class "tech__item"
    document.querySelectorAll(".tech__item").forEach((img, idx) => {
      if (techData.image[idx]) {
        img.src = `resources/${techData.image[idx]}`;
      } else {
        img.src = ""; // Clear image if no data
      }
    });

    // Select all existing <p> elements with class "tech__title"
    document.querySelectorAll(".tech__title").forEach((p, idx) => {
      if (techData.techTitle[idx]) {
        p.textContent = techData.techTitle[idx];
      } else {
        p.textContent = ""; // Clear text if no data
      }
    });
  });
});

document
  .querySelector(".project__icon__close")
  .addEventListener("click", function () {
    document.querySelector(".cover").classList.remove("open");
    document.querySelector("html").classList.remove("no__scroll");
  });

document.addEventListener("keydown", function (event) {
  console.log(event.key);
  if (event.key === "Escape") {
    document.querySelector(".cover").classList.remove("open");
    document.querySelector("html").classList.remove("no__scroll");
  }
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
