document.addEventListener('DOMContentLoaded', () => {

    // --- SCRIPT GENERAL PARA TODAS LAS PÁGINAS ---

    // Inicializar AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: true });
    }

    // Lógica del Preloader (si existe)
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }

    // Lógica del Menú Móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('is-active');
            menuToggle.innerHTML = mainNav.classList.contains('is-active') ? '✕' : '☰';
        });
    }


    // --- LÓGICA DEL PORTAFOLIO ---
    const portfolioPage = document.getElementById('portfolio-page');
    if (portfolioPage) {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.dataset.filter;

                portfolioItems.forEach(item => {
                    // Usamos una pequeña animación para el filtrado
                    item.style.transition = 'all 0.3s ease-out';
                    item.style.transform = 'scale(0.9)';
                    item.style.opacity = '0';
                    
                    setTimeout(() => {
                        if (filter === 'all' || item.dataset.category === filter) {
                            item.style.display = 'inline-block';
                             setTimeout(() => {
                                item.style.transform = 'scale(1)';
                                item.style.opacity = '1';
                             }, 50);
                        } else {
                            item.style.display = 'none';
                        }
                    }, 300);
                });
            });
        });

        // Lógica del Lightbox
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxClose = document.getElementById('lightbox-close');

        if(lightbox && lightboxImg && lightboxClose) {
            portfolioItems.forEach(item => {
                item.addEventListener('click', () => {
                    const imgSrc = item.querySelector('img').src;
                    lightboxImg.src = imgSrc;
                    lightbox.classList.add('active');
                });
            });

            const closeLightbox = () => {
                lightbox.classList.remove('active');
            };

            lightboxClose.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });
        }
    }


    // --- LÓGICA DEL COTIZADOR ---
    const calculatorForm = document.getElementById('calculator-form');
    if (calculatorForm) {
        // ... (Aquí iría el código completo del cotizador, que ya tenemos)
    }
});
