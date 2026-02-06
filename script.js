/**
 * DJ DANIE 254 - Personal Portfolio Website
 * JavaScript for interactivity and form validation
 * 
 * Author: Daniel Gathandi
 * Description: Handles mobile menu, form validation, and simple animations
 */

// Wait for DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function() {
    
    // ================================
    // Mobile Navigation Menu Toggle
    // ================================
    
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuBtn && navLinks) {
        // Toggle mobile menu when button is clicked
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
        
        // Close mobile menu when a link is clicked
        const links = navLinks.querySelectorAll('.nav-link');
        links.forEach(function(link) {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.nav') && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    }
    
    // ================================
    // Contact Form Validation
    // ================================
    
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            // Prevent the form from submitting normally
            event.preventDefault();
            
            // Clear previous error messages
            clearErrors();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validate the form
            let isValid = true;
            
            // Validate name
            if (name === '') {
                showError('name', 'Please enter your name');
                isValid = false;
            } else if (name.length < 2) {
                showError('name', 'Name must be at least 2 characters');
                isValid = false;
            }
            
            // Validate email
            if (email === '') {
                showError('email', 'Please enter your email address');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate message
            if (message === '') {
                showError('message', 'Please enter a message');
                isValid = false;
            } else if (message.length < 10) {
                showError('message', 'Message must be at least 10 characters');
                isValid = false;
            }
            
            // If all validations pass
            if (isValid) {
                // In a real scenario, you would send the form data to a server here
                // For this demo, we'll just show a success message
                
                // Hide the form
                contactForm.style.display = 'none';
                
                // Show success message
                if (successMessage) {
                    successMessage.style.display = 'block';
                }
                
                // Show a friendly alert
                alert('Thanks for reaching out, ' + name + '! I\'ll get back to you soon.');
                
                // Reset the form for potential future use
                contactForm.reset();
            }
        });
    }
    
    /**
     * Validate email format using regex
     * @param {string} email - The email address to validate
     * @returns {boolean} - True if valid, false otherwise
     */
    function isValidEmail(email) {
        // Simple email regex pattern
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
    
    /**
     * Show error message for a specific field
     * @param {string} fieldId - The ID of the form field
     * @param {string} message - The error message to display
     */
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(fieldId + 'Error');
        
        if (field) {
            field.classList.add('error');
        }
        
        if (errorElement) {
            errorElement.textContent = message;
        }
    }
    
    /**
     * Clear all error messages and styles
     */
    function clearErrors() {
        // Remove error class from all inputs
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(function(input) {
            input.classList.remove('error');
        });
        
        // Clear all error messages
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(function(error) {
            error.textContent = '';
        });
    }
    
    // ================================
    // Smooth Scroll for Internal Links
    // ================================
    
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            const targetId = this.getAttribute('href');
            
            // Only process if it's a valid anchor link
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    event.preventDefault();
                    
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ================================
    // Add Active Class to Current Page Nav Link
    // ================================
    
    // Get the current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Find and highlight the current page in navigation
    const navLinksAll = document.querySelectorAll('.nav-link');
    navLinksAll.forEach(function(link) {
        const linkHref = link.getAttribute('href');
        
        if (linkHref === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // ================================
    // Simple Hover Effects for Cards
    // ================================
    
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(function(card) {
        // Add slight scale effect on mouse enter
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        // Reset on mouse leave
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // ================================
    // Console Greeting (for fun)
    // ================================
    
    console.log('%c🎵 DJ DANIE 254 🎵', 'font-size: 24px; font-weight: bold; color: #e69500;');
    console.log('%cWelcome to my personal website!', 'font-size: 14px; color: #2d8a7c;');
    console.log('%cSoftware Engineering Student | DJ | Creator', 'font-size: 12px; color: #666;');
    console.log('---');
    console.log('Built with HTML, CSS, and JavaScript');
    console.log('For academic submission - University project');
    
});

/**
 * Utility function to show a custom alert/notification
 * Could be expanded for more complex notifications
 * @param {string} message - Message to display
 * @param {string} type - Type of alert (success, error, info)
 */
function showNotification(message, type) {
    // For now, just use a simple alert
    // In a more advanced version, this could create a custom notification UI
    alert(message);
}
