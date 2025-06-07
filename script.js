// JavaScript for portfolio website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true
    });

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Navigation menu toggle for mobile
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            tabBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the tab to show
            const tabToShow = this.getAttribute('data-tab');
            
            // Hide all tab panes
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
            });
            
            // Show the selected tab pane
            document.getElementById(tabToShow).classList.add('active');
        });
    });

    // Contact information masking functionality
    // About section email reveal
    const revealEmailBtn = document.getElementById('revealEmail');
    const hiddenEmail = document.getElementById('hiddenEmail');
    
    if (revealEmailBtn && hiddenEmail) {
        revealEmailBtn.addEventListener('click', function() {
            hiddenEmail.style.display = 'inline';
            this.style.display = 'none';
        });
    }
    
    // About section phone reveal
    const revealPhoneBtn = document.getElementById('revealPhone');
    const hiddenPhone = document.getElementById('hiddenPhone');
    
    if (revealPhoneBtn && hiddenPhone) {
        revealPhoneBtn.addEventListener('click', function() {
            hiddenPhone.style.display = 'inline';
            this.style.display = 'none';
        });
    }
    
    // Contact section email reveal
    const contactRevealEmailBtn = document.getElementById('contactRevealEmail');
    const contactHiddenEmail = document.getElementById('contactHiddenEmail');
    
    if (contactRevealEmailBtn && contactHiddenEmail) {
        contactRevealEmailBtn.addEventListener('click', function() {
            contactHiddenEmail.style.display = 'inline';
            this.style.display = 'none';
        });
    }
    
    // Contact section phone reveal
    const contactRevealPhoneBtn = document.getElementById('contactRevealPhone');
    const contactHiddenPhone = document.getElementById('contactHiddenPhone');
    
    if (contactRevealPhoneBtn && contactHiddenPhone) {
        contactRevealPhoneBtn.addEventListener('click', function() {
            contactHiddenPhone.style.display = 'inline';
            this.style.display = 'none';
        });
    }

    // Form submission with Formspree using AJAX
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the default form submission
        
        // Get form data
        const formData = new FormData(this);
        
        // Submit form using fetch API
        fetch("https://formspree.io/f/mblydbee", {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json"
            }
        } )
        .then(response => {
            if (response.ok) {
                // Show success message
                alert("Thank you for your message! I'll get back to you soon.");
                contactForm.reset(); // Reset the form
            } else {
                // Show error message
                alert("Oops! There was a problem submitting your form. Please try again.");
            }
        })
        .catch(error => {
            // Show error message
            alert("Oops! There was a problem submitting your form. Please try again.");
            console.error(error);
        });
    });
}

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
