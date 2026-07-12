// ========================================
// Mobile Menu Toggle
// ========================================
const mobileToggle = document.getElementById("mobile-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const iconMenu = document.getElementById("icon-menu");
const iconClose = document.getElementById("icon-close");

mobileToggle.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("active");
  iconMenu.style.display = isOpen ? "none" : "block";
  iconClose.style.display = isOpen ? "block" : "none";
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    iconMenu.style.display = "block";
    iconClose.style.display = "none";
  });
});

// ========================================
// Image Gallery for ACM Project
// ========================================
const galleries = {
  acm: {
    images: ["images/acm-screenshot-1.png", "images/acm-screenshot-2.png"],
    current: 0,
  },
  repair: {
    images: ["images/repair-screenshot-1.png", "images/repair-screenshot-2.png", "images/repair-screenshot-3.png"],
    current: 0,
  }
};

function updateGallery(galleryId) {
  const gallery = galleries[galleryId];
  const container = document.getElementById(`gallery-${galleryId}`);
  if (!container || !gallery) return;

  const img = container.querySelector(".project-gallery__viewport img");
  img.src = gallery.images[gallery.current];
  img.alt = `ACM Scientific Association Website screenshot ${gallery.current + 1}`;

  container.querySelectorAll(".project-gallery__dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === gallery.current);
  });
}

// Navigation buttons
document.querySelectorAll(".project-gallery__btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const galleryId = btn.dataset.gallery;
    const gallery = galleries[galleryId];
    if (!gallery) return;

    if (btn.dataset.dir === "prev") {
      gallery.current =
        gallery.current === 0 ? gallery.images.length - 1 : gallery.current - 1;
    } else {
      gallery.current =
        gallery.current === gallery.images.length - 1 ? 0 : gallery.current + 1;
    }
    updateGallery(galleryId);
  });
});

// Dot buttons
document.querySelectorAll(".project-gallery__dot").forEach((dot) => {
  dot.addEventListener("click", () => {
    const galleryId = dot.dataset.gallery;
    const gallery = galleries[galleryId];
    if (!gallery) return;

    gallery.current = parseInt(dot.dataset.index, 10);
    updateGallery(galleryId);
  });
});

// ========================================
// Scroll Fade-In Animation
// ========================================
const fadeElements = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

fadeElements.forEach((el) => observer.observe(el));
