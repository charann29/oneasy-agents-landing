/* ========================================
   ONEASY LANDING - SCRIPT.JS
   AOS, Swiper, FAQ, Tabs, Navigation, Form
   ======================================== */

// ========== AOS ANIMATION INIT ==========
AOS.init({
    duration: 900,
    easing: "ease-out-cubic",
    once: false,
    offset: 120
});

// ========== UTILITY ==========
function isMobile() {
    return window.innerWidth <= 992;
}

// ========== MEGA MENU - DESKTOP HOVER ==========
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

// ========== MEGA MENU - MOBILE ACCORDION ==========
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
    document.body.classList.toggle("menu-open");
    nav.classList.toggle("nav-open");
});

// ========== SMOOTH SCROLL WITH HEADER OFFSET ==========
const HEADER_OFFSET = document.querySelector(".site-header")?.offsetHeight || 80;

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href").substring(1);
        if (!targetId) return;
        const targetEl = document.getElementById(targetId);
        if (!targetEl) return;

        e.preventDefault();

        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - HEADER_OFFSET - 40;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });

        // Close mobile menu if open
        document.body.classList.remove("menu-open");
        nav.classList.remove("nav-open");
    });
});

// ========== FAQ ACCORDION ==========
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
    item.querySelector(".faq-question").addEventListener("click", () => {
        faqItems.forEach(i => {
            if (i !== item) i.classList.remove("active");
        });
        item.classList.toggle("active");
    });
});

// ========== TABS (Who is it for) ==========
document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

        btn.classList.add("active");
        document.getElementById(btn.dataset.tab).classList.add("active");
    });
});

// ========== WHITE CARD MOBILE ACCORDION ==========
document.querySelectorAll(".white-card .mob-accordion").forEach(header => {
    header.addEventListener("click", () => {
        const card = header.closest(".white-card");
        document.querySelectorAll(".white-card").forEach(c => {
            if (c !== card) c.classList.remove("active");
        });
        card.classList.toggle("active");
        if (window.AOS) {
            setTimeout(() => AOS.refreshHard(), 100);
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
    spaceBetween: 24,
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
            spaceBetween: 24
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 24
        }
    }
});

// ========== HEADER SCROLL EFFECT ==========
let lastScrollY = 0;
const siteHeader = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
        siteHeader.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.25)";
    } else {
        siteHeader.style.boxShadow = "none";
    }

    lastScrollY = currentScrollY;
});

// ========== TERMINAL TYPING ANIMATION ==========
function animateTerminals() {
    const terminals = document.querySelectorAll(".terminal-body");

    terminals.forEach(terminal => {
        const lines = terminal.querySelectorAll(".terminal-line");
        lines.forEach((line, index) => {
            line.style.opacity = "0";
            line.style.transform = "translateY(8px)";
            line.style.transition = "opacity 0.4s ease, transform 0.4s ease";

            setTimeout(() => {
                line.style.opacity = "1";
                line.style.transform = "translateY(0)";
            }, 300 + (index * 200));
        });
    });
}

// Trigger terminal animation when cards come into view
const terminalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const terminal = entry.target.querySelector(".terminal-body");
            if (terminal) {
                const lines = terminal.querySelectorAll(".terminal-line");
                lines.forEach((line, index) => {
                    line.style.opacity = "0";
                    line.style.transform = "translateY(8px)";
                    line.style.transition = "opacity 0.4s ease, transform 0.4s ease";

                    setTimeout(() => {
                        line.style.opacity = "1";
                        line.style.transform = "translateY(0)";
                    }, 200 + (index * 250));
                });
            }
            terminalObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll(".visual-terminal").forEach(term => {
    terminalObserver.observe(term);
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
                // Show success state
                submitBtn.textContent = "Sent!";
                submitBtn.style.background = "#27C93F";
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

// ========== AGENT CARD HOVER ANIMATION ==========
document.querySelectorAll(".agent-mini-card").forEach(card => {
    card.addEventListener("mouseenter", () => {
        const icon = card.querySelector(".agent-mini-icon");
        if (icon) {
            icon.style.transform = "scale(1.1)";
            icon.style.transition = "transform 0.3s ease";
        }
    });

    card.addEventListener("mouseleave", () => {
        const icon = card.querySelector(".agent-mini-icon");
        if (icon) {
            icon.style.transform = "scale(1)";
        }
    });
});

// ========== COUNTER ANIMATION FOR STATS (if added) ==========
function animateCounter(el, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);

    function step() {
        start += increment;
        if (start >= target) {
            el.textContent = target;
            return;
        }
        el.textContent = Math.floor(start);
        requestAnimationFrame(step);
    }
    step();
}
