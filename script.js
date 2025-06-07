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

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default to show our custom notification first
            
            // Create and show a custom notification
            const notification = document.createElement('div');
            notification.className = 'form-notification';
            notification.innerHTML = `
                <div class="notification-content">
                    <i class="fas fa-paper-plane"></i>
                    <h3>Sending your message...</h3>
                    <p>Please wait while we process your submission.</p>
                </div>
            `;
            
        // Add notification styles if not already in your CSS
        const style = document.createElement('style');
        style.textContent = `
            .form-notification {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
            }
            .notification-content {
                background-color: var(--light-color);
                padding: 30px;
                border-radius: var(--border-radius);
                text-align: center;
                max-width: 400px;
                box-shadow: var(--box-shadow);
            }
            .notification-content i {
                font-size: 3rem;
                color: var(--secondary-color);
                margin-bottom: 15px;
            }
            .notification-content h3 {
                margin-bottom: 10px;
            }
            .notification-content p {
                margin-bottom: 20px;
            }
            .form-notification.success .fa-paper-plane {
                display: none;
            }
            .form-notification.success .fa-check-circle {
                display: inline-block;
            }
            .form-notification.error .fa-paper-plane {
                display: none;
            }
            .form-notification.error .fa-exclamation-circle {
                display: inline-block;
            }
        `;
        
        document.body.appendChild(style);
        document.body.appendChild(notification);
        
        // Submit the form data to Formspree
        const formData = new FormData(this);
        
        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            // Update notification to show success
            notification.classList.add('success');
            notification.querySelector('.notification-content').innerHTML = `
                <i class="fas fa-check-circle"></i>
                <h3>Thank you for your message!</h3>
                <p>I'll get back to you as soon as possible.</p>
                <button id="closeNotification">Close</button>
            `;
            
            // Close notification when button is clicked
            document.getElementById('closeNotification').addEventListener('click', function() {
                notification.remove();
            });
            
            // Reset the form
            contactForm.reset();
        })
        .catch(error => {
            // Update notification to show error
            notification.classList.add('error');
            notification.querySelector('.notification-content').innerHTML = `
                <i class="fas fa-exclamation-circle"></i>
                <h3>Oops! Something went wrong</h3>
                <p>Please try again or contact me directly at bashinim2011@gmail.com</p>
                <button id="closeNotification">Close</button>
            `;
            
            // Close notification when button is clicked
            document.getElementById('closeNotification').addEventListener('click', function() {
                notification.remove();
            });
            
            console.error('Error:', error);
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
