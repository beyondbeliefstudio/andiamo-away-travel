import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// INITIALIZATION
// ==========================================
window.addEventListener("DOMContentLoaded", () => {
  // initHeroAnimations();
  initGalleryAnimations();
  initScrollerAnimations();
  initNavActiveStates();
  initLighthouseGalleryModal();
});

// Initialize parallax after all content loads
window.addEventListener("load", () => {
  initParallaxEffects();
});

// ==========================================
// HERO ANIMATIONS
// ==========================================
// function initHeroAnimations() {
//   // Hero content animation
//   const contentItems = document.querySelectorAll(".hero__content > *");
//   if (contentItems.length > 0) {
//     gsap.from(contentItems, {
//       y: 40,
//       opacity: 0,
//       duration: 1,
//       stagger: 0.15,
//       ease: "power2.out",
//     });
//   }
// }

// ==========================================
// GALLERY ANIMATIONS
// ==========================================
function initGalleryAnimations() {
  const galleryImages = document.querySelectorAll(".gallery-item img");
  if (galleryImages.length > 0) {
    gsap.from(galleryImages, {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
    });

    // Hover scale effect
    galleryImages.forEach(item => {
      item.addEventListener("mouseenter", () => {
        gsap.to(item, { scale: 1.03, duration: 0.3, ease: "back.out(1.7)" });
      });
      item.addEventListener("mouseleave", () => {
        gsap.to(item, { scale: 1, duration: 0.3, ease: "power2.out" });
      });
    });
  }
}

// ==========================================
// SCROLLER ANIMATIONS
// ==========================================
function initScrollerAnimations() {
  const scrollers = document.querySelectorAll(".scroller-image");

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
}

// ==========================================
// NAVIGATION ACTIVE STATES
// ==========================================
function initNavActiveStates() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".nav a.nav-link[href]");

  const normalizePath = path => (path === "/" ? "/" : path.replace(/\/$/, ""));
  const normalizedCurrentPath = normalizePath(currentPath);

  const hashLinks = [];

  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;

    const parsed = new URL(href, window.location.origin);
    const normalizedLinkPath = normalizePath(parsed.pathname);

    if (parsed.hash && normalizedLinkPath === normalizedCurrentPath) {
      const section = document.querySelector(parsed.hash);
      if (section) {
        hashLinks.push({ link, hash: parsed.hash, section });
      }
    }
  });

  if (hashLinks.length > 0) {
    const setActiveHash = hash => {
      navLinks.forEach(link => link.classList.remove("active"));
      if (!hash) return;
      hashLinks.forEach(item => {
        if (item.hash === hash) item.link.classList.add("active");
      });
    };

    const getNavOffset = () => {
      const navContainer = document.querySelector(".nav__container");
      return (navContainer?.offsetHeight ?? 72) + 24;
    };

    const updateActiveSection = () => {
      const offset = getNavOffset();
      let currentHash = null;

      hashLinks.forEach(item => {
        if (item.section.getBoundingClientRect().top - offset <= 0) {
          currentHash = item.hash;
        }
      });

      setActiveHash(currentHash);
    };

    if (window.location.hash) {
      setActiveHash(window.location.hash);
    }

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    window.addEventListener("hashchange", () => setActiveHash(window.location.hash));
    return;
  }

  navLinks.forEach(link => {
    if (!link.getAttribute("href")) return;

    const linkPath = new URL(link.href).pathname;
    const normalizedLinkPath = normalizePath(linkPath);

    if (normalizedLinkPath === normalizedCurrentPath) {
      link.classList.add("active");
    }
  });
}

// ==========================================
// PARALLAX EFFECTS
// ==========================================
function initParallaxEffects() {
  // Split overlay images
  // gsap.utils.toArray(".split__img-wrapper").forEach(wrapper => {
  //   const img = wrapper.querySelector("img");

  //   if (img) {
  //     gsap.to(img, {
  //       yPercent: 30,
  //       ease: "none",
  //       scrollTrigger: {
  //         trigger: wrapper,
  //         start: "top bottom",
  //         end: "bottom top",
  //         scrub: true,
  //       },
  //     });
  //   }
  // });

  // Hero background - disable on mobile for better LCP
  const heroBg = document.querySelector(".hero__bg");
  if (heroBg && window.innerWidth > 768) {
    gsap.to(heroBg, {
      yPercent: 50,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }
}

// ==========================================
// LIGHTHOUSE GALLERY MODAL
// ==========================================
window.LighthouseGalleryModal = {
  open: function (imageSrc, imageAlt = "Gallery Image") {
    const modal = document.getElementById("lighthouse-gallery-modal");
    const modalImage = document.getElementById("lighthouse-gallery-modal__image");

    if (modal && modalImage) {
      modalImage.src = imageSrc;
      modalImage.alt = imageAlt;
      modal.classList.add("active");

      // Lock body scroll
      document.body.style.overflow = "hidden";

      // Focus management for accessibility
      modal.focus();
    }
  },

  close: function () {
    const modal = document.getElementById("lighthouse-gallery-modal");
    const modalImage = document.getElementById("lighthouse-gallery-modal__image");

    if (modal) {
      modal.classList.remove("active");

      // Clear the image source to prevent flash of previous image
      if (modalImage) {
        modalImage.src = "";
        modalImage.alt = "";
      }

      // Restore body scroll
      document.body.style.overflow = "";
    }
  },
};

function initLighthouseGalleryModal() {
  const modal = document.getElementById("lighthouse-gallery-modal");
  const closeButton = document.querySelector(".lighthouse-gallery-modal__close");
  const backdrop = document.querySelector(".lighthouse-gallery-modal__backdrop");

  // Close button click
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      window.LighthouseGalleryModal.close();
    });
  }

  // Backdrop click
  if (backdrop) {
    backdrop.addEventListener("click", () => {
      window.LighthouseGalleryModal.close();
    });
  }

  // Escape key
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal && modal.classList.contains("active")) {
      window.LighthouseGalleryModal.close();
    }
  });
}
