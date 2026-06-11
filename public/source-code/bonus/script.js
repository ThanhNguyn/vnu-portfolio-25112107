// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-up');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        el.style.opacity = 0;
        if(el.classList.contains('fade-in-up')) {
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        } else {
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        }
        observer.observe(el);
    });

    // Prompt Tabs Logic
    const promptTabs = document.querySelectorAll('.prompt-tab');
    const promptPanes = document.querySelectorAll('.prompt-pane');

    promptTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            promptTabs.forEach(t => t.classList.remove('active'));
            promptPanes.forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            const targetId = tab.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Model Tabs Logic (Inside each prompt pane)
    promptPanes.forEach(pane => {
        const modelTabs = pane.querySelectorAll('.model-tab');
        const modelPanes = pane.querySelectorAll('.model-pane');

        modelTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                modelTabs.forEach(t => t.classList.remove('active'));
                modelPanes.forEach(p => p.classList.remove('active'));

                tab.classList.add('active');
                const modelId = tab.getAttribute('data-model');
                
                const promptId = pane.id.replace('prompt-', 'p');
                const targetPaneId = `${promptId}-${modelId}`;
                document.getElementById(targetPaneId).classList.add('active');
            });
        });
    });
});
