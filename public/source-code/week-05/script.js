/* ============================================
   AI × Creative — JavaScript
   Navigation, scroll, animations, lightbox
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initProgress();
    initScrollReveal();
});

/* ═══ NAVIGATION ═══ */
function initNav() {
    const nav = document.getElementById('topnav');
    const burger = document.getElementById('burger');
    const drawer = document.getElementById('drawer');
    const pills = document.querySelectorAll('.pill');
    const drawerLinks = document.querySelectorAll('.drawer-link');
    const sections = document.querySelectorAll('section[id], header[id]');

    // Scroll effect
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 60);

        // Active pill
        let current = '';
        sections.forEach(s => {
            if (window.scrollY >= s.offsetTop - 250) current = s.id;
        });
        pills.forEach(p => {
            p.classList.toggle('active', p.getAttribute('href') === '#' + current);
        });
    });

    // Burger
    burger.addEventListener('click', () => {
        burger.classList.toggle('open');
        drawer.classList.toggle('open');
    });

    drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('open');
            drawer.classList.remove('open');
        });
    });
}

/* ═══ READING PROGRESS ═══ */
function initProgress() {
    const bar = document.getElementById('progress');
    window.addEventListener('scroll', () => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        const pct = (window.scrollY / h) * 100;
        bar.style.width = pct + '%';
    });
}

/* ═══ SCROLL REVEAL ═══ */
function initScrollReveal() {
    const elements = document.querySelectorAll('.anim');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(el => observer.observe(el));
}

/* ═══ LIGHTBOX ═══ */
function openLb(el) {
    const img = el.querySelector('img');
    const lb = document.getElementById('lb');
    const lbImg = document.getElementById('lbImg');
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLb() {
    document.getElementById('lb').classList.remove('active');
    document.body.style.overflow = '';
}

document.getElementById('lb').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeLb();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLb();
});
