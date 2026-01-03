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
  const navLinks = document.querySelectorAll("a.nav-link");

  const normalizePath = path => (path === "/" ? "/" : path.replace(/\/$/, ""));

  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    const normalizedLinkPath = normalizePath(linkPath);
    const normalizedCurrentPath = normalizePath(currentPath);

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
