document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const links = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth Scrolling for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Set minimum date for reservation to today
    const dateInput = document.getElementById('date');
    if(dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    // Reservation Modal Logic
    const reservationForm = document.querySelector('.reservation-form');
    const modal = document.getElementById('reservationModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    if(reservationForm && modal) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Show modal
            modal.classList.add('active');
            // Reset form
            this.reset();
            // Reset the min date
            if(dateInput) {
                const today = new Date().toISOString().split('T')[0];
                dateInput.setAttribute('min', today);
            }
        });
    }

    if(closeModalBtn && modal) {
        closeModalBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    // Close modal when clicking outside of it
    if(modal) {
        modal.addEventListener('click', (e) => {
            if(e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // Menu Category Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuCards = document.querySelectorAll('.menu-card');

    if(filterBtns.length > 0 && menuCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                menuCards.forEach(card => {
                    // Reset animation classes
                    card.classList.remove('show');
                    
                    if(filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.classList.remove('hide');
                        // Add show class with slight delay to trigger animation
                        setTimeout(() => {
                            card.classList.add('show');
                        }, 10);
                    } else {
                        card.classList.add('hide');
                    }
                });
            });
        });
    }
});
