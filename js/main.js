/* =====================================================
   NAVA — Site interactions
   ===================================================== */
(function () {
  "use strict";

  /* ---- Sticky nav background ---- */
  const nav = document.querySelector(".nav");
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle("scrolled", window.scrollY > 24);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu toggle ---- */
  const toggle = document.querySelector(".nav__toggle");
  if (toggle && nav) {
    toggle.addEventListener("click", () => nav.classList.toggle("open"));
    nav.querySelectorAll(".nav__links a").forEach((a) =>
      a.addEventListener("click", () => nav.classList.remove("open"))
    );
  }

  /* ---- Reveal on scroll ---- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  /* ---- Card spotlight follow ---- */
  document.querySelectorAll(".card").forEach(card=>{

card.addEventListener("mousemove",e=>{

const r=card.getBoundingClientRect();

const x=(e.clientX-r.left)/r.width-.5;
const y=(e.clientY-r.top)/r.height-.5;

card.style.transform=
`perspective(800px)
rotateY(${x*12}deg)
rotateX(${-y*12}deg)
translateY(-8px)`;

});

card.addEventListener("mouseleave",()=>{
card.style.transform="";
});

});

  /* ---- Animated counters ---- */
  const counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target;
          const target = parseFloat(el.dataset.count);
          const suffix = el.dataset.suffix || "";
          const dur = 1400;
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            const val = target * eased;
            el.textContent =
              (Number.isInteger(target) ? Math.round(val) : val.toFixed(1)) + suffix;
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          cio.unobserve(el);
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => cio.observe(el));
  }

  /* ---- Footer year ---- */
  const yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---- Contact form validation (client-side demo) ---- */
  // const form = document.getElementById("contactForm");
  // if (form) {
  //   const setInvalid = (field, on) =>
  //     field.closest(".field").classList.toggle("invalid", on);

  //   form.addEventListener("submit", (e) => {
  //     e.preventDefault();
  //     let ok = true;
  //     const required = form.querySelectorAll("[required]");
  //     required.forEach((f) => {
  //       const empty = !f.value.trim();
  //       const badEmail =
  //         f.type === "email" && f.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value);
  //       const invalid = empty || badEmail;
  //       setInvalid(f, invalid);
  //       if (invalid) ok = false;
  //     });
  //     if (!ok) {
  //       const firstBad = form.querySelector(".field.invalid input, .field.invalid select, .field.invalid textarea");
  //       if (firstBad) firstBad.focus();
  //       return;
  //     }
  //     const success = document.getElementById("formSuccess");
  //     if (success) success.classList.add("show");
  //     form.reset();
  //     setTimeout(() => success && success.classList.remove("show"), 6000);
  //   });

  //   form.querySelectorAll("[required]").forEach((f) => {
  //     f.addEventListener("input", () => setInvalid(f, false));
  //   });
  // }
})();



