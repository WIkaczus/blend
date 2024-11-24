document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Close mobile menu if open
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');

            // Smooth scroll to target
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Portfolio Filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => item.classList.add('animate'), 100);
                } else {
                    item.classList.remove('animate');
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });

    // YouTube Video Modal
    let player;
    const modal = document.getElementById('video-modal');
    const closeModal = document.querySelector('.close-modal');
    const portfolioVideos = document.querySelectorAll('.portfolio-item[data-youtube-id]');

    // Initialize YouTube Player API
    window.onYouTubeIframeAPIReady = function() {
        player = new YT.Player('youtube-player', {
            height: '100%',
            width: '100%',
            playerVars: {
                'autoplay': 0,
                'controls': 1,
                'rel': 0,
                'showinfo': 0
            }
        });
    };

    // Handle video clicks
    portfolioVideos.forEach(video => {
        video.addEventListener('click', (e) => {
            // Don't open modal if clicking on YouTube link
            if (e.target.closest('.watch-on-youtube')) return;

            const videoId = video.getAttribute('data-youtube-id');
            openVideoModal(videoId);
        });
    });

    function openVideoModal(videoId) {
        modal.style.display = 'block';
        if (player && player.loadVideoById) {
            player.loadVideoById(videoId);
        } else {
            // If player isn't ready yet, create it with the video
            player = new YT.Player('youtube-player', {
                height: '100%',
                width: '100%',
                videoId: videoId,
                playerVars: {
                    'autoplay': 1,
                    'controls': 1,
                    'rel': 0,
                    'showinfo': 0
                }
            });
        }
    }

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        if (player && player.stopVideo) {
            player.stopVideo();
        }
    });

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            if (player && player.stopVideo) {
                player.stopVideo();
            }
        }
    });

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            if (player && player.stopVideo) {
                player.stopVideo();
            }
        }
    });

    // Intersection Observer for section animations
    const sections = document.querySelectorAll('section');
    const portfolioItemsArr = Array.from(portfolioItems);

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // If it's the portfolio section, animate items
                if (entry.target.id === 'portfolio') {
                    portfolioItemsArr.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Active navigation highlight on scroll
    const observeNavigation = () => {
        const navOptions = {
            threshold: 0.5,
            rootMargin: '-50% 0px -50% 0px'
        };

        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Remove active class from all nav links
                    navLinks.forEach(link => link.classList.remove('active'));
                    // Add active class to corresponding nav link
                    const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
                    if (activeLink) activeLink.classList.add('active');
                }
            });
        }, navOptions);

        sections.forEach(section => {
            navObserver.observe(section);
        });
    };

    observeNavigation();

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add form submission animation
            const submitBtn = contactForm.querySelector('.submit-btn');
            submitBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                submitBtn.style.transform = 'scale(1)';
                // Here you would typically handle the form submission
                alert('Dziękujemy za wiadomość! Skontaktujemy się wkrótce.');
                contactForm.reset();
            }, 200);
        });
    }
});
