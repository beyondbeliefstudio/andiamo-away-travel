import gsap from "gsap";
// Run when DOM is ready
window.addEventListener("DOMContentLoaded", () => {
  // Left-side text animation
  const contentItems = document.querySelectorAll(".hero__content > *");
  if (contentItems.length > 0) {
    gsap.from(contentItems, {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power2.out",
    });
  }

  // Animate cards in
  const cards = gsap.utils.toArray(".heroCard");
  cards.forEach((card, i) => {
    const isFirst = i === 0;

    gsap.from(card, {
      opacity: 0,
      scale: isFirst ? 0.9 : 0.95,
      x: isFirst ? 0 : i % 2 === 0 ? -100 : 100,
      duration: 1,
      delay: 0.3 + i * 0.1,
      ease: "power3.out",
    });
  });

  // Activate first card manually
  const firstCard = document.querySelector(".heroCard");
  if (firstCard) {
    firstCard.classList.add("active");
    gsap.set(firstCard, { zIndex: 10 });
  }
});

/* -- Glow effect -- */

const blob = document.getElementById("blob");

if (blob) {
  window.onpointermove = event => {
    const { clientX, clientY } = event;

    blob.animate(
      {
        left: `${clientX}px`,
        top: `${clientY}px`,
      },
      { duration: 3000, fill: "forwards" }
    );
  };
}

/* -- Hero Slider -- */

const heroImages = document.querySelectorAll(".heroCard");
const prevBtn = document.getElementById("prevArrow");
const nextBtn = document.getElementById("nextArrow");

let currentIndex = null;
let isAnimating = false;

const zIndexMap = {
  0: [null, 3, 2, 1],
  1: [4, null, 3, 2],
  2: [3, 4, null, 5],
  3: [3, 4, 5, null],
};

// Set first card as active on page load
if (heroImages.length > 0 && currentIndex === null) {
  currentIndex = 0;
  heroImages[0].classList.add("active");

  // Optional: set initial z-index positions for visual stack
  const zIndexes = zIndexMap[0];
  heroImages.forEach((img, i) => {
    gsap.set(img, {
      zIndex: i === 0 ? 10 : zIndexes[i],
    });
  });
}

// Handle both direct clicks and arrow clicks
function animateToCard(index) {
  if (isAnimating || index === currentIndex || index < 0 || index >= heroImages.length) return;
  isAnimating = true;

  const card = heroImages[index];
  const direction = currentIndex === null || index > currentIndex ? 1 : -1;

  if (currentIndex !== null) {
    heroImages[currentIndex].classList.remove("active");
  }

  card.classList.add("active");

  const tl = gsap.timeline({
    defaults: { ease: "cubic-bezier(0.75, 0, 0.25, 1)" },
    onComplete: () => {
      const zIndexes = zIndexMap[index];
      heroImages.forEach((img, i) => {
        gsap.set(img, {
          zIndex: i === index ? 10 : zIndexes[i],
        });
      });
      currentIndex = index;
      isAnimating = false;
    },
  });

  tl.set(card, { zIndex: 5 });

  tl.to(card, {
    duration: 0.25,
    scale: 0.8,
    rotate: direction === 1 ? 4 : -4,
    x: direction * 300,
  });

  tl.add(() => {
    gsap.set(card, { zIndex: 999 });
  });

  tl.to(card, {
    duration: 0.25,
    scale: 1,
    rotate: 0,
    x: 0,
  });
}

// Card click listeners
heroImages.forEach((card, index) => {
  card.addEventListener("click", () => animateToCard(index));
});

// Arrow click listeners
if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    const nextIndex = currentIndex === null ? 0 : (currentIndex - 1 + heroImages.length) % heroImages.length;
    animateToCard(nextIndex);
  });
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    const nextIndex = currentIndex === null ? 0 : (currentIndex + 1) % heroImages.length;
    animateToCard(nextIndex);
  });
}

// GALLERY GRID
// Animate grid items on page load
window.addEventListener("DOMContentLoaded", () => {
  const galleryImages = document.querySelectorAll(".gallery-item img");
  if (galleryImages.length > 0) {
    gsap.from(galleryImages, {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
    });

    // Add a fun hover scale bounce
    galleryImages.forEach(item => {
      item.addEventListener("mouseenter", () => {
        gsap.to(item, { scale: 1.03, duration: 0.3, ease: "back.out(1.7)" });
      });
      item.addEventListener("mouseleave", () => {
        gsap.to(item, { scale: 1, duration: 0.3, ease: "power2.out" });
      });
    });
  }
});

// REVIEW SCROLLER
const scrollers = document.querySelectorAll(".scroller-image");

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach(scroller => {
    scroller.setAttribute("data-animated", true);

    const scrollerInner = scroller.querySelector(".scroller-inner-image");
    const scrollerContent = Array.from(scrollerInner.children);

    for (var i = 0; i < 3; i++) {
      scrollerContent.forEach(item => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute("aria-hidden", true);
        scrollerInner.appendChild(duplicatedItem);
      });
    }
  });
}

// NAV ACTIVE STATES
document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll("a.nav-link");

  // Helper function to normalize paths by removing trailing slashes
  const normalizePath = path => (path === "/" ? "/" : path.replace(/\/$/, ""));

  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;

    // Normalize both paths for comparison
    const normalizedLinkPath = normalizePath(linkPath);
    const normalizedCurrentPath = normalizePath(currentPath);

    if (normalizedLinkPath === normalizedCurrentPath) {
      link.classList.add("active");
    }
  });
});
