(function () {
  if (document.getElementById('loader')) {
/* LOADER */
  window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    const pct = document.getElementById("loader-pct");
    let n = 0;
    const iv = setInterval(() => {
      n = Math.min(n + Math.floor(Math.random() * 18) + 5, 100);
      pct.textContent = n + "%";
      if (n >= 100) { clearInterval(iv); setTimeout(() => loader.classList.add("hidden"), 350); }
    }, 80);
  });

  /* CURSOR GLOW */
  const glow = document.getElementById("cursor-glow");
  document.addEventListener("mousemove", e => {
    glow.style.left = e.clientX + "px";
    glow.style.top  = e.clientY + "px";
  });

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isDesktop = window.matchMedia("(min-width: 901px)").matches;

  /* NAVBAR SCROLL */
  const navbar = document.getElementById("navbar");
  const scrollTopBtn = document.getElementById("scroll-top");
  const scrollProgress = document.getElementById("scroll-progress");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
    scrollTopBtn.classList.toggle("show", window.scrollY > 400);

    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    scrollProgress.style.width = Math.min(100, Math.max(0, pct)) + "%";
  }, { passive: true });
  scrollTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* SCROLL REVEAL + COUNTERS */
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      entry.target.querySelectorAll("[data-count]").forEach(animateCount);
      if (entry.target.hasAttribute("data-count")) animateCount(entry.target);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal, .reveal-stagger").forEach(el => io.observe(el));

  /* 3D DEPTH: SCROLL PARALLAX */
  if (!reduceMotion && isDesktop) {
    const parallaxEls = Array.from(document.querySelectorAll(".parallax-layer[data-parallax-speed]"));
    let rafId = 0;

    const updateParallax = () => {
      const vh = window.innerHeight;
      parallaxEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -120 || rect.top > vh + 120) return;
        const speed = parseFloat(el.dataset.parallaxSpeed || "0.1");
        const centerOffset = (rect.top + rect.height * 0.5 - vh * 0.5) / vh;
        const y = centerOffset * speed * -120;
        const rX = centerOffset * speed * 8;
        el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) rotateX(${rX.toFixed(2)}deg)`;
      });
      rafId = 0;
    };

    const onScrollParallax = () => {
      if (!rafId) rafId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener("scroll", onScrollParallax, { passive: true });
    window.addEventListener("resize", onScrollParallax);
    onScrollParallax();
  }

  /* 3D DEPTH: MOUSE TILT */
  if (!reduceMotion && isDesktop) {
    const tiltTargets = Array.from(document.querySelectorAll(".prog-card, .trainer-card, .pricing-card, .contact-form-card, .feature-box"));
    tiltTargets.forEach(card => {
      card.classList.add("tilt-target");

      const popCandidates = card.querySelectorAll(".prog-overlay, .trainer-overlay, .plan-name, .price-row, .form-title, .feature-box-title, .feature-box-toggle");
      popCandidates.forEach(node => node.classList.add("tilt-pop"));

      card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rx = (0.5 - py) * 10;
        const ry = (px - 0.5) * 14;
        card.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-2px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
      });
    });
  }

  function animateCount(el) {
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || "";
    const start = performance.now();
    const dur = 1600;
    (function step(now) {
      const t = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.floor(ease * target) + suffix;
      if (t < 1) requestAnimationFrame(step);
    })(start);
  }

  /* TOAST */
  function showToast(msg) {
    const toast = document.getElementById("toast");
    document.getElementById("toast-msg").textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3200);
  }

  /* RIPPLE */
  document.addEventListener("click", e => {
    const btn = e.target.closest(".btn-red");
    if (!btn) return;
    const r = document.createElement("span");
    const rect = btn.getBoundingClientRect();
    Object.assign(r.style, {
      position: "absolute", borderRadius: "50%", background: "rgba(255,255,255,.22)",
      width: "10px", height: "10px",
      left: (e.clientX - rect.left - 5) + "px",
      top:  (e.clientY - rect.top  - 5) + "px",
      transform: "scale(0)", pointerEvents: "none",
      animation: "ripple .55s ease forwards"
    });
    btn.appendChild(r);
    setTimeout(() => r.remove(), 600);
  });
  const rs = document.createElement("style");
  rs.textContent = "@keyframes ripple{to{transform:scale(28);opacity:0}}";
  document.head.appendChild(rs);

  /* ALL PRIMARY CTAS REDIRECT TO ASSESSMENT PAGE */
  const assessmentUrl = "assessment.html";
  const ctaSelectors = [
    "#promo-btn",
    "#join-btn",
    "#hero-cta",
    "#trainers-join",
    "#cta-main",
    ".pricing-cta",
    ".btn-wa",
    ".btn-email",
    ".float-btn-wa",
    ".float-btn-email",
    ".sticky-cta-button",
    ".cta-actions .btn-outline",
    "a[href^='https://wa.me/']",
    "a[href^='mailto:']"
  ];

  document.querySelectorAll(ctaSelectors.join(",")).forEach(el => {
    el.addEventListener("click", e => {
      e.preventDefault();
      window.location.href = assessmentUrl;
    });
  });

  /* CONTACT FORM */
  document.getElementById("contact-form").addEventListener("submit", e => {
    e.preventDefault();
    const btn = e.target.querySelector("button[type=submit]");
    btn.textContent = "Sending\u2026";
    btn.disabled = true;
    setTimeout(() => {
      showToast("Message sent! We'll reply within 2 hours.");
      e.target.reset();
      btn.textContent = "Send Message \u2192";
      btn.disabled = false;
    }, 1200);
  });

  /* NEWSLETTER */
  document.getElementById("newsletter-btn").addEventListener("click", () => {
    const input = document.getElementById("newsletter-email");
    if (!input.value || !input.value.includes("@")) { showToast("Please enter a valid email address."); return; }
    showToast("Subscribed! Welcome to the buroFit community.");
    input.value = "";
  });

  /* FEATURE BOX INTERACTIONS */
  const featureBoxes = Array.from(document.querySelectorAll(".feature-box"));

  function activateFeatureBox(key) {
    featureBoxes.forEach(box => box.classList.toggle("active", box.dataset.featureBox === key));
  }

  featureBoxes.forEach(box => {
    box.addEventListener("click", () => {
      const key = box.dataset.featureBox;
      const isActive = box.classList.contains("active");
      if (isActive) return;
      activateFeatureBox(key);
    });
  });

  }

  if (document.getElementById('assessment-form')) {
const form = document.getElementById("assessment-form");
    const progress = document.getElementById("form-progress");
    const progressWrap = document.querySelector(".progress-wrap");
    const toast = document.getElementById("toast");
    const steps = Array.from(document.querySelectorAll(".section[data-step]"));
    const stepDots = Array.from(document.querySelectorAll(".step-dot"));
    const prevBtn = document.getElementById("prev-step");
    const nextBtn = document.getElementById("next-step");

    const heightInput = document.getElementById("height");
    const weightInput = document.getElementById("weight");
    const avatar = document.getElementById("avatar");
    const silhouetteBase = document.getElementById("silhouette-base");
    const previewHeight = document.getElementById("preview-height");
    const previewWeight = document.getElementById("preview-weight");
    const previewBmi = document.getElementById("preview-bmi");

    let activeStep = 1;
    const maxStep = 5;

    function clamp(value, min, max) {
      return Math.min(max, Math.max(min, value));
    }

    function showToast(text, success) {
      toast.innerHTML = (success ? "<b>Done:</b> " : "<b>Note:</b> ") + text;
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 1800);
    }

    function validateCurrentStep() {
      const requiredFields = form.querySelectorAll(`.section[data-step="${activeStep}"] [required]`);
      for (const el of requiredFields) {
        if (!String(el.value || "").trim()) {
          el.focus();
          showToast("Please complete required fields before continuing.", false);
          return false;
        }
      }
      return true;
    }

    function updateStepUI() {
      steps.forEach(section => {
        const sectionStep = Number(section.dataset.step);
        section.classList.toggle("active", sectionStep === activeStep);
      });

      stepDots.forEach((dot, idx) => {
        const n = idx + 1;
        dot.classList.toggle("completed", n < activeStep);
        dot.classList.toggle("active", n === activeStep);
      });

      prevBtn.style.display = activeStep === 1 ? "none" : "inline-flex";
      nextBtn.style.display = "inline-flex";
      nextBtn.textContent = activeStep === maxStep ? "Submit Assessment" : "Next Step";
      progress.style.width = ((activeStep / maxStep) * 100).toFixed(1) + "%";
    }

    function updateBodyPreview() {
      const h = parseFloat(heightInput.value) || 170;
      const w = parseFloat(weightInput.value) || 70;
      const hNorm = clamp((h - 150) / 50, 0, 1);
      const wNorm = clamp((w - 45) / 105, 0, 1);

      const scaleY = 0.9 + (hNorm * 0.42);
      const scaleX = 0.88 + (wNorm * 0.34);
      avatar.style.transform = `translateX(-50%) scale(${scaleX.toFixed(3)}, ${scaleY.toFixed(3)})`;

      silhouetteBase.style.transform = `translate(-50%, -50%) scale(${(0.94 + wNorm * 0.28).toFixed(3)}, ${(0.94 + hNorm * 0.18).toFixed(3)})`;

      const bmi = w / Math.pow(h / 100, 2);
      previewHeight.textContent = h.toFixed(0) + " cm";
      previewWeight.textContent = w.toFixed(1) + " kg";
      previewBmi.textContent = isFinite(bmi) ? bmi.toFixed(1) : "-";
    }

    function showSubmittedState() {
      if (progressWrap) progressWrap.style.display = "none";
      toast.classList.remove("show");

      form.innerHTML = `
        <section class="assessment-success" role="status" aria-live="polite">
          <p class="assessment-success-kicker">Assessment Submitted</p>
          <h2>Thank you. Your details have been received.</h2>
          <p>Redirecting you to the main page in <b id="redirect-countdown">3</b> seconds...</p>
          <a class="btn btn-main" href="index.html">Go now</a>
        </section>
      `;

      const countdownEl = document.getElementById("redirect-countdown");
      let secondsLeft = 3;
      const countdownInterval = setInterval(() => {
        secondsLeft -= 1;
        if (countdownEl) countdownEl.textContent = String(Math.max(0, secondsLeft));
        if (secondsLeft <= 0) clearInterval(countdownInterval);
      }, 1000);

      setTimeout(() => {
        window.location.href = "index.html";
      }, 3000);
    }

    prevBtn.addEventListener("click", () => {
      activeStep = clamp(activeStep - 1, 1, maxStep);
      updateStepUI();
    });

    nextBtn.addEventListener("click", () => {
      if (activeStep === maxStep) {
        form.requestSubmit();
        return;
      }
      if (!validateCurrentStep()) return;
      activeStep = clamp(activeStep + 1, 1, maxStep);
      updateStepUI();
    });

    heightInput.addEventListener("input", updateBodyPreview);
    weightInput.addEventListener("input", updateBodyPreview);

    form.addEventListener("submit", e => {
      e.preventDefault();

      const allRequired = Array.from(form.querySelectorAll("[required]"));
      const incomplete = allRequired.find(el => !String(el.value || "").trim());
      if (incomplete) {
        const parentStep = incomplete.closest(".section")?.dataset.step;
        if (parentStep) activeStep = Number(parentStep);
        updateStepUI();
        incomplete.focus();
        showToast("Please complete all required fields before submit.", false);
        return;
      }

      showSubmittedState();
    });

    updateStepUI();
    updateBodyPreview();

  }
})();
