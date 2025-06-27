document.addEventListener('DOMContentLoaded', () => {

    // --- SCRIPT GENERAL PARA TODAS LAS PÁGINAS ---

    // Inicializar AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: true });
    }

    // Lógica del Preloader
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
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxClose = document.getElementById('lightbox-close');

        // Lógica de los filtros
        if (filterButtons.length > 0 && portfolioItems.length > 0) {
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    const filter = button.dataset.filter;

                    portfolioItems.forEach(item => {
                        if (filter === 'all' || item.dataset.category === filter) {
                            item.style.display = 'inline-block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                });
            });
        }
        
        // Lógica del Lightbox
        if (lightbox && lightboxImg && lightboxClose) {
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
        const allCalculatorInputs = calculatorForm.querySelectorAll('input[type="checkbox"], input[type="radio"]');
        const totalDisplay = document.getElementById('total-display');
        const totalInput = document.getElementById('total-estimado-input');
        const resumenInput = document.getElementById('resumen-cotizacion-input');
        const serviceTypeInput = document.getElementById('tipo_servicio_cotizado');
        const selectionButtons = document.querySelectorAll('.service-selection-menu .btn');
        const calculatorSections = document.querySelectorAll('.calculator-section');
        const formatter = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 });

        const calculateTotal = () => {
            let currentTotal = 0;
            let resumenTexto = "";
            const activeSection = document.querySelector('.calculator-section.active');
            
            if (activeSection) {
                activeSection.querySelectorAll('input:checked').forEach(input => {
                    const price = parseFloat(input.dataset.price);
                    const titleAndPrice = input.value;
                    currentTotal += price;
                    resumenTexto += `- ${titleAndPrice}\n`;
                });
            }
            
            if (totalDisplay && totalInput && resumenInput) {
                totalDisplay.textContent = formatter.format(currentTotal);
                totalInput.value = formatter.format(currentTotal);
                
                if (resumenTexto) {
                    resumenInput.value = `--- DETALLES DE LA COTIZACIÓN ---\n${resumenTexto}\n--- TOTAL ---\n${formatter.format(currentTotal)}`;
                } else {
                    resumenInput.value = "No se seleccionaron servicios.";
                }
            }
        };

        const toggleDescription = (input) => {
            const item = input.closest('.service-item');
            const description = item.querySelector('.description');
            if (description) {
                description.style.display = input.checked ? 'block' : 'none';
            }
        };

        selectionButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = button.dataset.target;
                selectionButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                calculatorSections.forEach(section => section.classList.remove('active'));
                
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.classList.add('active');
                }
                
                if (serviceTypeInput) {
                    serviceTypeInput.value = button.textContent;
                }

                allCalculatorInputs.forEach(input => {
                    input.checked = false;
                    const desc = input.closest('.service-item').querySelector('.description');
                    if (desc) desc.style.display = 'none';
                });
                calculateTotal();
            });
        });

        allCalculatorInputs.forEach(input => {
            input.addEventListener('change', () => {
                if (input.type === 'radio') {
                    const radioGroup = document.querySelectorAll(`input[name="${input.name}"]`);
                    radioGroup.forEach(radio => {
                        const desc = radio.closest('.service-item').querySelector('.description');
                        if (desc) desc.style.display = 'none';
                    });
                }
                toggleDescription(input);
                calculateTotal();
            });
        });

        const initiallyActiveButton = document.querySelector('.service-selection-menu .btn.active');
        if (initiallyActiveButton) {
            const initialTarget = initiallyActiveButton.dataset.target;
            const initialSection = document.getElementById(initialTarget);
            if (initialSection) {
                initialSection.classList.add('active');
            }
        }
        calculateTotal();
    }
});
```</details>
