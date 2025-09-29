
document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu functionality
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
            if (hamburger && navLinks) { // Add null check for hamburger and navLinks
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
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
               const newHref = stylesheetLink.href.split('?')[0] + '?v=5&t=' + new Date().getTime();
               stylesheetLink.href = newHref;
           }

    // Smooth scrolling for navigation links (if you still need this for internal anchors)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Video Grid Functionality (if you still need this for video players)
    const videoTracks = document.querySelectorAll('.video-track');

    videoTracks.forEach(track => {
        const containerCount = track.querySelectorAll('.video-container').length;
        if (containerCount < 10) {
            const containersToClone = track.querySelectorAll('.video-container');
            containersToClone.forEach(container => {
                const clone = container.cloneNode(true);
                track.appendChild(clone);
            });
        }
    });
});

// Analytics tracking for contact link
document.addEventListener('DOMContentLoaded', function() {
    const contactLink = document.querySelector('a[href="contact.html"]');
    if (contactLink) {
        contactLink.addEventListener('click', function() {
            gtag('event', 'contact_click', {
                'event_category': 'engagement',
                'event_label': 'contact_link',
                'value': 1
            });
        });
    }

    // Track portfolio link clicks
    const portfolioLink = document.querySelector('a[href="portfolio.html"]');
    if (portfolioLink) {
        portfolioLink.addEventListener('click', function() {
            gtag('event', 'portfolio_click', {
                'event_category': 'engagement',
                'event_label': 'portfolio_link',
                'value': 1
            });
        });
    }

    // Track about link clicks
    const aboutLink = document.querySelector('a[href="about.html"]');
    if (aboutLink) {
        aboutLink.addEventListener('click', function() {
            gtag('event', 'about_click', {
                'event_category': 'engagement',
                'event_label': 'about_link',
                'value': 1
            });
        });
    }

    // Track home logo clicks
    const logoLink = document.querySelector('.logo a');
    if (logoLink) {
        logoLink.addEventListener('click', function() {
            gtag('event', 'logo_click', {
                'event_category': 'engagement',
                'event_label': 'home_logo',
                'value': 1
            });
        });
    }
});