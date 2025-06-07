// JavaScript for portfolio website with tabbed navigation

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

    // Profile image placeholder click event
    const profilePlaceholder = document.querySelector('.profile-image-placeholder');
    profilePlaceholder.addEventListener('click', function() {
        alert('To add a profile picture: \n\n1. Edit the HTML file\n2. Replace the placeholder div with an <img> tag\n3. Set the src attribute to your image file path\n\nExample: <img src="your-image.jpg" alt="Profile Picture" class="profile-image">');
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
            alert(`Thank you for your message, ${name}! \n\nThis is a demo form. In a real implementation, your message would be sent to Bashini Mahaarachchi.`);
            
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
