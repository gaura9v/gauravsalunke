document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Scroll reveal animations using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Form submission handler
    const form = document.querySelector('.contact-form');
    if (form) {
        // Initialize EmailJS
        (function() {
            emailjs.init("7Ra4k4ZGrXD2xSJHA");
        })();

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Sending...';
            
            try {
                await emailjs.sendForm('service_hosrz4e', 'template_pv6sjmv', form);
                btn.innerText = 'Message Sent!';
                btn.style.background = '#43E97B';
                form.reset();
            } catch (error) {
                btn.innerText = 'Error - Try Again';
                console.error('EmailJS Error:', error);
            }
            
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = '';
            }, 3000);
        });
    }
});