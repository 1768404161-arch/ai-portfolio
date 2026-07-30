/* ====== NAVBAR SCROLL EFFECT ====== */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 60);
});

/* ====== MOBILE NAV TOGGLE ====== */
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav-links");
navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("open");
  navLinks.classList.toggle("open");
});
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

/* ====== ACTIVE NAV LINK ON SCROLL ====== */
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) current = section.getAttribute("id");
  });
  navItems.forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
});

/* ====== PROJECT FILTER ====== */
const filterBtns = document.querySelectorAll(".filter-btn");
const workCards = document.querySelectorAll(".work-card");
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const category = btn.dataset.filter;
    workCards.forEach(card => {
      if (category === "all" || card.dataset.category === category) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

/* ====== SCROLL REVEAL ====== */
const revealElements = document.querySelectorAll(
  ".work-card, .about-grid, .showreel-placeholder"
);
revealElements.forEach(el => el.classList.add("reveal"));
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -30px 0px" }
);
revealElements.forEach(el => revealObserver.observe(el));
window.addEventListener("load", () => {
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) el.classList.add("visible");
  });
});

/* ====== VIDEO / IMAGE MODAL ====== */
const videoModal = document.getElementById("videoModal");
const modalVideo = document.getElementById("modalVideo");
const modalImage = document.getElementById("modalImage");
const modalClose = document.getElementById("videoModalClose");

// Video cards
document.querySelectorAll(".work-video-thumb").forEach(thumb => {
  thumb.addEventListener("click", () => {
    const src = thumb.dataset.video;
    if (src) {
      modalVideo.src = src;
      modalVideo.style.display = "block";
      modalImage.style.display = "none";
      videoModal.classList.add("open");
      modalVideo.play();
    }
  });
});

// Gallery cards (image preview)
document.querySelectorAll(".work-card[data-category=gallery]").forEach(card => {
  const img = card.querySelector(".work-image");
  function openImage() {
    if (img) {
      modalImage.src = img.src;
      modalImage.style.display = "block";
      modalVideo.style.display = "none";
      modalVideo.pause();
      videoModal.classList.add("open");
    }
  }
  card.querySelector(".work-thumb")?.addEventListener("click", openImage);
  card.querySelector(".work-view")?.addEventListener("click", openImage);
});

modalClose.addEventListener("click", closeMediaModal);
videoModal.addEventListener("click", e => { if (e.target === videoModal) closeMediaModal(); });
function closeMediaModal() {
  videoModal.classList.remove("open");
  modalVideo.pause();
  modalVideo.src = "";
  modalImage.style.display = "none";
}
document.addEventListener("keydown", e => { if (e.key === "Escape") closeMediaModal(); });
