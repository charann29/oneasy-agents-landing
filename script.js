/* ========================================
   ONEASY LANDING — SCRIPT.JS
   Ressl-inspired dark theme: sharp, purposeful motion
   No AOS dependency — native IntersectionObserver
   ======================================== */

// ========== UTILITY ==========
function isMobile() {
    return window.innerWidth <= 1024;
}

// ========== FADE-IN ANIMATION (replaces AOS) ==========
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

document.querySelectorAll(".section-head, .service-card, .benefit-card, .hiw-step, .testimonial-card, .platform-cta-card, .contact-inner, .agent-mini-card").forEach((el, i) => {
    el.classList.add("fade-in");
    el.style.transitionDelay = `${Math.min(i % 3 * 0.08, 0.24)}s`;
    fadeObserver.observe(el);
});

// ========== MEGA MENU — DESKTOP HOVER ==========
document.querySelectorAll(".nav > ul > li").forEach(li => {
    const mega = li.querySelector(".mega-menu");
    if (!mega) return;

    li.addEventListener("mouseenter", () => {
        if (isMobile()) return;
        mega.style.display = "block";
        li.classList.add("hovering");
    });

    li.addEventListener("mouseleave", () => {
        if (isMobile()) return;
        mega.style.display = "none";
        li.classList.remove("hovering");
    });
});

// ========== MEGA MENU — MOBILE ACCORDION ==========
document.querySelectorAll(".nav > ul > li").forEach(li => {
    const mega = li.querySelector(".mega-menu");
    const link = li.querySelector(":scope > a");

    if (!mega) return;

    link.addEventListener("click", (e) => {
        if (!isMobile()) return;
        if (link.getAttribute("href") === "#") {
            e.preventDefault();
        } else {
            return;
        }
        const isOpen = li.classList.contains("open");
        document.querySelectorAll(".nav > ul > li.open").forEach(openLi => {
            openLi.classList.remove("open");
            const m = openLi.querySelector(".mega-menu");
            if (m) m.style.display = "none";
        });
        if (!isOpen) {
            li.classList.add("open");
            mega.style.display = "block";
        }
    });
});

// ========== MOBILE NAV CLOSE ON LINK CLICK ==========
document.querySelectorAll(".nav a").forEach(link => {
    link.addEventListener("click", () => {
        if (!isMobile()) return;

        const li = link.closest("li");
        const isParentWithMega = li && li.querySelector(".mega-menu");
        const isInsideMega = link.closest(".mega-menu");

        if (isParentWithMega && !isInsideMega) return;

        document.body.classList.remove("menu-open");
        document.querySelector(".nav").classList.remove("nav-open");
    });
});

// ========== RESIZE HANDLER ==========
window.addEventListener("resize", () => {
    if (!isMobile()) {
        document.querySelectorAll(".nav > ul > li .mega-menu").forEach(menu => {
            menu.style.display = "";
        });
        document.querySelectorAll(".nav > ul > li").forEach(li => {
            li.classList.remove("open", "hovering");
        });
        document.body.classList.remove("menu-open");
        document.querySelector(".nav").classList.remove("nav-open");
    }
});

// ========== HAMBURGER TOGGLE ==========
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");

hamburger.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("menu-open");
    nav.classList.toggle("nav-open");
    hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    hamburger.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

// ========== SMOOTH SCROLL WITH HEADER OFFSET ==========
const HEADER_OFFSET = document.querySelector(".site-header")?.offsetHeight || 56;

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href").substring(1);
        if (!targetId) return;
        const targetEl = document.getElementById(targetId);
        if (!targetEl) return;

        e.preventDefault();

        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - HEADER_OFFSET - 32;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });

        document.body.classList.remove("menu-open");
        nav.classList.remove("nav-open");
    });
});

// ========== FAQ ACCORDION ==========
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
    const btn = item.querySelector(".faq-question");
    btn.addEventListener("click", () => {
        faqItems.forEach(i => {
            if (i !== item) {
                i.classList.remove("active");
                const otherBtn = i.querySelector(".faq-question");
                if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
            }
        });
        const isOpen = item.classList.toggle("active");
        btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
});

// ========== TABS (Who is it for) ==========
document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-btn").forEach(b => {
            b.classList.remove("active");
            b.setAttribute("aria-selected", "false");
        });
        document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");
        document.getElementById(btn.dataset.tab).classList.add("active");
    });
});

// ========== WHITE CARD MOBILE ACCORDION ==========
document.querySelectorAll(".white-card .mob-accordion").forEach(header => {
    header.addEventListener("click", () => {
        const card = header.closest(".white-card");
        document.querySelectorAll(".white-card").forEach(c => {
            if (c !== card) {
                c.classList.remove("active");
                const otherBtn = c.querySelector(".mob-accordion");
                if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
            }
        });
        const isOpen = card.classList.toggle("active");
        header.setAttribute("aria-expanded", isOpen ? "true" : "false");

        // Trigger terminal animation when card opens
        if (card.classList.contains("active")) {
            const terminal = card.querySelector(".terminal-body");
            if (terminal && !terminal.dataset.animated) {
                terminal.dataset.animated = "true";
                const lines = terminal.querySelectorAll(".terminal-line");
                lines.forEach((line, idx) => {
                    line.style.opacity = "0";
                    line.style.transform = "translateY(6px)";
                    line.style.transition = "opacity 0.4s ease, transform 0.4s ease";
                    setTimeout(() => {
                        line.style.opacity = "1";
                        line.style.transform = "translateY(0)";
                    }, 150 + (idx * 200));
                });
            }
        }
    });
});

// ========== INTEGRATION SLIDER (Swiper) ==========
new Swiper(".integration-slider", {
    slidesPerView: "auto",
    spaceBetween: 0,
    loop: true,
    speed: 5000,
    allowTouchMove: false,
    autoplay: {
        delay: 0,
        disableOnInteraction: false
    },
    freeMode: true,
    freeModeMomentum: false
});

// ========== TESTIMONIALS SLIDER ==========
new Swiper("#testimonials-swiper", {
    slidesPerView: 1,
    spaceBetween: 16,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
            spaceBetween: 16
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 16
        }
    }
});

// ========== HEADER SCROLL — SUBTLE SHADOW ==========
const siteHeader = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
        siteHeader.style.borderBottomColor = "rgba(255, 255, 255, 0.15)";
    } else {
        siteHeader.style.borderBottomColor = "";
    }
}, { passive: true });

// ========== TERMINAL TYPING ANIMATION ==========
const terminalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const terminal = entry.target.querySelector(".terminal-body");
            if (terminal && !terminal.dataset.animated) {
                terminal.dataset.animated = "true";
                const lines = terminal.querySelectorAll(".terminal-line");
                lines.forEach((line, index) => {
                    line.style.transition = "opacity 0.4s ease, transform 0.4s ease";
                    setTimeout(() => {
                        line.style.opacity = "1";
                        line.style.transform = "translateY(0)";
                    }, 200 + (index * 200));
                });
            }
            terminalObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll(".visual-terminal").forEach(term => {
    if (!term.closest(".stack-card")) {
        terminalObserver.observe(term);
    }
});

// ========== CONTACT FORM ==========
const form = document.getElementById("book-a-demo-form");
if (form) {
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        formData.append("access_key", "9e0fda75-65a1-4660-abe2-48f2c529e2c7");

        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                submitBtn.textContent = "Sent!";
                submitBtn.style.background = "#30d158";
                form.reset();

                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = "";
                    submitBtn.disabled = false;
                }, 3000);
            } else {
                alert("Error: " + data.message);
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        } catch (error) {
            alert("Something went wrong. Please try again.");
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// ========== INTELLIGENCE STACK — STICKY CARDS & PROGRESS ==========
(function() {
    const stackCards = document.querySelectorAll(".stack-card");
    const progressDots = document.querySelectorAll(".progress-dot");

    if (!stackCards.length || !progressDots.length) return;

    // Click on progress dots to scroll to card
    progressDots.forEach(dot => {
        dot.addEventListener("click", () => {
            const targetId = dot.dataset.target;
            const targetCard = document.getElementById(targetId);
            if (targetCard) {
                const offset = document.querySelector(".site-header")?.offsetHeight || 56;
                const top = targetCard.getBoundingClientRect().top + window.pageYOffset - offset - 40;
                window.scrollTo({ top, behavior: "smooth" });
            }
        });
    });

    const stackObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const card = entry.target;
            const cardId = card.id;
            const cardIndex = Array.from(stackCards).indexOf(card);

            if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
                // Update progress dots
                progressDots.forEach(d => d.classList.remove("active"));
                const activeDot = document.querySelector(`.progress-dot[data-target="${cardId}"]`);
                if (activeDot) activeDot.classList.add("active");

                // Mark cards above as stuck
                stackCards.forEach((c, i) => {
                    if (i < cardIndex) {
                        c.classList.add("stuck");
                    } else {
                        c.classList.remove("stuck");
                    }
                });

                // Trigger terminal animation
                const terminal = card.querySelector(".terminal-body");
                if (terminal && !terminal.dataset.animated) {
                    terminal.dataset.animated = "true";
                    const lines = terminal.querySelectorAll(".terminal-line");
                    lines.forEach((line, idx) => {
                        line.style.transition = "opacity 0.4s ease, transform 0.4s ease";
                        setTimeout(() => {
                            line.style.opacity = "1";
                            line.style.transform = "translateY(0)";
                        }, 200 + (idx * 200));
                    });
                }
            }
        });
    }, {
        threshold: [0.3, 0.5],
        rootMargin: "-80px 0px -20% 0px"
    });

    function initStackObserver() {
        if (window.innerWidth > 1024) {
            stackCards.forEach(card => stackObserver.observe(card));
        } else {
            stackCards.forEach(card => {
                stackObserver.unobserve(card);
                card.classList.remove("stuck");
            });
            progressDots.forEach(d => d.classList.remove("active"));
        }
    }

    initStackObserver();
    window.addEventListener("resize", initStackObserver);
})();
