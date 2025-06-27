document.addEventListener('DOMContentLoaded', () => {

    // --- SCRIPT GENERAL PARA TODAS LAS PÁGINAS ---
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: true });
    }

    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            setTimeout(() => { preloader.style.display = 'none'; }, 500);
        });
    }

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
        // ... (La lógica del portafolio se mantiene igual) ...
    }

    // --- LÓGICA DEL COTIZADOR ---
    const calculatorForm = document.getElementById('calculator-form');
    if (calculatorForm) {
        const allCalculatorInputs = calculatorForm.querySelectorAll('input[type="checkbox"], input[type="radio"]');
        const totalDisplay = document.getElementById('total-display');
        const totalInput = document.getElementById('total-estimado-input');
        const resumenInput = document.getElementById('resumen-cotizacion-input'); // Campo oculto para el resumen
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
                    // Usamos el 'value' que ya tiene el nombre y el precio
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
                // ... (lógica de botones sin cambios) ...
                calculateTotal(); // Llama a la función unificada
            });
        });

        allCalculatorInputs.forEach(input => {
            input.addEventListener('change', () => {
                // ... (lógica de inputs sin cambios) ...
                toggleDescription(input);
                calculateTotal(); // Llama a la función unificada
            });
        });

        // Carga inicial
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
