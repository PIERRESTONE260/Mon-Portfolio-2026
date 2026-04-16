/**
 * PORTFOLIO SCRIPTS - PIERRE NGOY
 * Gère : Menu Mobile, Dark Mode, Slider & Animations au Scroll
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. GESTION DU MENU MOBILE (HAMBURGER) ---
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('nav');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Change l'icône entre barres et croix
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        });
    }

    // --- 2. GESTION DU THÈME (DARK / LIGHT) ---
    const themeButton = document.getElementById('theme-button');
    const body = document.body;

    // Vérifier si l'utilisateur a déjà choisi un thème auparavant
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeButton.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }

    if (themeButton) {
        themeButton.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            const icon = themeButton.querySelector('i');

            if (body.classList.contains('dark-theme')) {
                icon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('portfolio-theme', 'dark');
            } else {
                icon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('portfolio-theme', 'light');
            }
        });
    }

    // --- 3. INITIALISATION DU SLIDER (SWIPER.JS) ---
    // S'exécute uniquement si l'élément existe (sur la page index.html)
    if (document.querySelector('.hero-swiper')) {
        new Swiper('.hero-swiper', {
            loop: true,
            autoplay: {
                delay: 3500,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
        });
    }

    // --- 4. ANIMATIONS AU DÉFILEMENT (INTERSECTION OBSERVER) ---
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');

    const appearanceOptions = {
        threshold: 0.15, // Déclenche quand 15% de l'élément est visible
        rootMargin: "0px 0px -50px 0px"
    };

    const appearanceObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                // On arrête d'observer une fois l'animation jouée
                observer.unobserve(entry.target);
            }
        });
    }, appearanceOptions);

    animatedElements.forEach(el => {
        appearanceObserver.observe(el);
    });

});