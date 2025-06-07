// JavaScript for portfolio website with tabbed navigation and privacy protection

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Navigation scroll effect
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links ul li a');
    const sections = document.querySelectorAll('section');
    const backToTopButton = document.getElementById('backToTop');

    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navLinks');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Scroll event listener
    window.addEventListener('scroll', function() {
        // Navbar scroll effect
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button visibility
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }

        // Active nav link based on scroll position
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Back to top button click event
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the tab to show
            const tabToShow = this.getAttribute('data-tab');
            
            // Hide all tab panes
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Show the selected tab pane
            document.getElementById(`${tabToShow}-tab`).classList.add('active');
            
            // Add animation to the tab content
            document.getElementById(`${tabToShow}-tab`).style.animation = 'fadeIn 0.5s forwards';
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // In a real implementation, this would send the form data to a server
            // For now, just show a success message
            alert(`Thank you for your message, ${name}! I will get back to you at the earliest opportunity.`);
            
            // Reset form
            contactForm.reset();
        });
    }

    // Add smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add interactive hover effects to skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add interactive hover effects to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const dot = this.querySelector('.timeline-dot');
            dot.style.transform = 'translateX(-50%) scale(1.5)';
            dot.style.backgroundColor = '#e6f1ff';
        });
        
        item.addEventListener('mouseleave', function() {
            const dot = this.querySelector('.timeline-dot');
            dot.style.transform = 'translateX(-50%) scale(1)';
            dot.style.backgroundColor = '#64ffda';
        });
    });

    // Add animation to tab content
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });

    // Add keyframe animation for tab transitions
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
});

// NEW: Privacy Protection Functionality
function revealContact(containerId, contactInfo) {
    const container = document.getElementById(containerId);
    const mask = container.querySelector('.privacy-mask');
    const canvas = container.querySelector('.contact-canvas');
    
    // Hide the mask
    mask.style.display = 'none';
    
    // Show and generate the canvas image
    canvas.style.display = 'block';
    generateContactImage(canvas, contactInfo);
}

function generateContactImage(canvas, text) {
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 300;
    canvas.height = 40;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set background (optional - for better visibility)
    ctx.fillStyle = 'rgba(186, 169, 255, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Set text properties
    ctx.font = '16px Poppins, sans-serif';
    ctx.fillStyle = '#4a3a6a';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    
    // Add padding and center vertically
    const padding = 10;
    const centerY = canvas.height / 2;
    
    // Draw the text
    ctx.fillText(text, padding, centerY);
    
    // Optional: Add a subtle border
    ctx.strokeStyle = 'rgba(116, 20, 63, 0.2)';
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

// Function to create a downloadable image (bonus feature)
function downloadContactImage(canvas, filename) {
    const link = document.createElement('a');
    link.download = filename || 'contact-info.png';
    link.href = canvas.toDataURL();
    link.click();
}

// Enhanced profile image error handling
function handleProfileImageError(img) {
    // Hide the broken image
    img.style.display = 'none';
    
    // Show the placeholder
    const placeholder = img.nextElementSibling;
    if (placeholder && placeholder.classList.contains('profile-image-placeholder')) {
        placeholder.style.display = 'flex';
    }
    
    // Optional: Log the error for debugging
    console.warn('Profile image failed to load:', img.src);
}

// Function to retry loading profile image (bonus feature)
function retryProfileImage() {
    const img = document.querySelector('.profile-image');
    const placeholder = document.querySelector('.profile-image-placeholder');
    
    if (img && placeholder) {
        // Prompt user for new image URL or allow file upload
        const newSrc = prompt('Enter new profile image URL:');
        if (newSrc) {
            img.onerror = function() {
                handleProfileImageError(this);
            };
            img.onload = function() {
                placeholder.style.display = 'none';
                this.style.display = 'block';
            };
            img.src = newSrc;
        }
    }
}

// Add click handler to profile placeholder for image upload (bonus feature)
document.addEventListener('DOMContentLoaded', function() {
    const placeholder = document.querySelector('.profile-image-placeholder');
    if (placeholder) {
        placeholder.addEventListener('click', function() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const img = document.querySelector('.profile-image');
                        img.src = e.target.result;
                        img.style.display = 'block';
                        placeholder.style.display = 'none';
                    };
                    reader.readAsDataURL(file);
                }
            };
            input.click();
        });
    }
});
