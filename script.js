document.addEventListener('DOMContentLoaded', function() {
    // Existing hamburger menu code
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Form submission handling
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    submitButton.textContent = 'Message Sent!';
                    contactForm.reset();
                    setTimeout(() => {
                        submitButton.textContent = originalButtonText;
                        submitButton.disabled = false;
                    }, 3000);
                } else {
                    const data = await response.json();
                    if (data.errors) {
                        alert(data.errors.map(error => error.message).join('\n'));
                    } else {
                        alert('Oops! There was a problem sending your message.');
                    }
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Oops! An error occurred. Please try again later.');
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }
        });
    }

    // Cache-busting for stylesheet
    const stylesheetLink = document.querySelector('link[href*="style.css"]');
    if (stylesheetLink) {
        const newHref = stylesheetLink.href.split('?')[0] + '?v=3&t=' + new Date().getTime();
        stylesheetLink.href = newHref;
    }
}); 