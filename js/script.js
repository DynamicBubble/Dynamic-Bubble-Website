// ===================================
// Active Navigation State
// ===================================

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-card-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ===================================
// Scroll Reveal Animations
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            // Stop observing once revealed (animation only plays once)
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with scroll-reveal class and set active link on load
document.addEventListener('DOMContentLoaded', () => {
    setActiveNavLink();
    
    // Initialize scroll-reveal observer
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    scrollRevealElements.forEach(el => observer.observe(el));
});

// ===================================
// Smooth Scrolling for Anchor Links
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Only prevent default for actual anchor links (not just "#")
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Contact form handling is now in pages/contact.html with email functionality





// ===================================
// Navbar Shadow on Scroll
// ===================================

let lastScroll = 0;
const cardNavContainer = document.querySelector('.card-nav-container');

if (cardNavContainer) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY || window.pageYOffset;

        if (currentScroll > 50) {
            cardNavContainer.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            cardNavContainer.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        }

        lastScroll = currentScroll;
    });
}

// ===================================
// FAQ Accordion Toggle
// ===================================

const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.closest('.faq-item');
        const isActive = faqItem.classList.contains('active');

        // Close all other FAQ items for accordion effect
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
                const btn = item.querySelector('.faq-question');
                if (btn) {
                    btn.setAttribute('aria-expanded', 'false');
                }
            }
        });

        // Toggle current item
        faqItem.classList.toggle('active');
        question.setAttribute('aria-expanded', !isActive);

        // Smooth scroll to item if opening and not fully visible
        if (!isActive) {
            setTimeout(() => {
                const rect = faqItem.getBoundingClientRect();
                const isFullyVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

                if (!isFullyVisible) {
                    faqItem.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest'
                    });
                }
            }, 300); // Wait for animation to start
        }
    });
});

// ===================================
// Newsletter Form Handler
// ===================================

const newsletterForm = document.getElementById('newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();

        // Simple email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailPattern.test(email)) {
            // Show success message
            showNewsletterSuccess();
            emailInput.value = '';
        } else {
            alert('Please enter a valid email address');
        }
    });
}

function showNewsletterSuccess() {
    const successDiv = document.createElement('div');
    successDiv.className = 'newsletter-success-toast';
    successDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span style="font-size: 1.5rem;">✅</span>
            <div>
                <strong style="display: block; margin-bottom: 0.25rem;">Success!</strong>
                <span style="font-size: 0.875rem; opacity: 0.95;">You've subscribed to our newsletter</span>
            </div>
        </div>
    `;

    document.body.appendChild(successDiv);

    // Remove after 4 seconds
    setTimeout(() => {
        successDiv.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
        successDiv.style.opacity = '0';
        successDiv.style.transform = 'translateX(100%)';
        setTimeout(() => successDiv.remove(), 300);
    }, 4000);
}

// ===================================
// Dynamic Copyright Year
// ===================================

const copyrightYear = document.getElementById('copyright-year');
if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
}
