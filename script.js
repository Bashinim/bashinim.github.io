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

    // Create modal elements for form submission feedback
    const modalHTML = `
        <div id="formModal" class="modal">
            <div class="modal-content">
                <div id="modalIcon" class="modal-icon">
                    <i class="fas fa-check-circle success"></i>
                    <i class="fas fa-exclamation-circle error" style="display: none;"></i>
                </div>
                <h3 id="modalTitle" class="modal-title">Thank you!</h3>
                <p id="modalMessage" class="modal-message">Your message has been sent successfully.</p>
                <button id="modalButton" class="modal-button">Close</button>
            </div>
        </div>
    `;
    
    // Append modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Get modal elements
    const formModal = document.getElementById('formModal');
    const modalIcon = document.getElementById('modalIcon');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const modalButton = document.getElementById('modalButton');
    const successIcon = modalIcon.querySelector('.success');
    const errorIcon = modalIcon.querySelector('.error');
    
    // Close modal function
    function closeModal() {
        formModal.style.display = 'none';
    }
    
    // Modal button click event
    modalButton.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === formModal) {
            closeModal();
        }
    });
    
    // Show success modal
    function showSuccessModal(message) {
        successIcon.style.display = 'inline-block';
        errorIcon.style.display = 'none';
        modalTitle.textContent = 'Thank you!';
        modalMessage.textContent = message || 'Your message has been sent successfully.';
        formModal.style.display = 'block';
    }
    
    // Show error modal
    function showErrorModal(message) {
        successIcon.style.display = 'none';
        errorIcon.style.display = 'inline-block';
        modalTitle.textContent = 'Oops! Something went wrong';
        modalMessage.textContent = message || 'Please try again or contact me directly at bashinim2011@gmail.com';
        formModal.style.display = 'block';
    }

    // Form submission with Formspree using AJAX
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;
            
            // Get form data
            const formData = new FormData(this);
            
            // Submit form using fetch API
            fetch("https://formspree.io/f/mblydbee", {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            })
            .then(response => {
                // Parse the JSON response regardless of status
                return response.json().then(data => {
                    // Add the original response status to the data
                    return { ...data, ok: response.ok };
                });
            })
            .then(data => {
                // Reset button state
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                
                if (data.ok) {
                    // Show success message
                    showSuccessModal("Thank you for your message! I'll get back to you soon.");
                    contactForm.reset(); // Reset the form
                } else {
                    // Show error message with more details
                    let errorMsg = "There was a problem with your submission. Please try again.";
                    if (data.errors) {
                        errorMsg = data.errors.map(error => error.message).join(", ");
                    }
                    showErrorModal(errorMsg);
                }
            })
            .catch(error => {
                // Reset button state
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                
                // Show error message
                showErrorModal("There was a problem connecting to the server. Please try again later.");
                console.error("Form submission error:", error);
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
