$(document).ready(function() {
    // Initialize loading screen
    setTimeout(() => {
        $('#loading-screen').fadeOut(1000);
    }, 2000);

    // Initialize particles
    initializeParticles();

    // Initialize typing animation
    initializeTyping();

    // Initialize counter animation
    initializeCounters();

    // Initialize skill bars
    initializeSkillBars();

    // Initialize AOS
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Mobile menu toggle
    $('#menu').click(function() {
        $(this).toggleClass('fa-times');
        $('header').toggleClass('toggle');
    });

    // Close mobile menu on scroll
    $(window).on('scroll load', function() {
        $('#menu').removeClass('fa-times');
        $('header').removeClass('toggle');
    });

    // Smooth scrolling for navigation links
    $('a[href*="#"]').on('click', function(e) {
        const target = $(this).attr('href');
        if (target === '#' || !$(target).length) return;

        e.preventDefault();

        $('html, body').animate({
            scrollTop: $(target).offset().top - 50
        }, 800, 'easeInOutCubic');
    });

    // Active navigation highlighting
    $(window).scroll(function() {
        let current = '';
        $('section').each(function() {
            const sectionTop = $(this).offset().top;
            const sectionHeight = $(this).height();
            if (pageYOffset >= sectionTop - 200) {
                current = $(this).attr('id');
            }
        });

        $('header .navbar ul li a').removeClass('active');
        $('header .navbar ul li a[href="#' + current + '"]').addClass('active');
    });

    // Add scroll animations
    $(window).scroll(function() {
        const scrolled = $(window).scrollTop();
        const parallax = scrolled * 0.5;

        // Parallax effect for floating elements
        $('.floating-elements').css('transform', 'translateY(' + parallax + 'px)');

        // Header background opacity
        if (scrolled > 100) {
            $('header').addClass('scrolled');
        } else {
            $('header').removeClass('scrolled');
        }
    });

    // Touch hover effects for mobile
    document.querySelectorAll('header .navbar ul li a').forEach(link => {
        link.addEventListener('touchstart', () => {
            link.classList.add('hover-effect');
        });
        link.addEventListener('touchend', () => {
            setTimeout(() => {
                link.classList.remove('hover-effect');
            }, 150);
        });
    });

    // Form submission with validation
    $('.contact-form').submit(function(e) {
        e.preventDefault();

        const name = $('input[placeholder="Your Name"]').val();
        const email = $('input[placeholder="Your Email"]').val();
        const subject = $('input[placeholder="Subject"]').val();
        const message = $('.message').val();

        if (validateForm(name, email, subject, message)) {
            showNotification('Message sent successfully!', 'success');
            this.reset();
        } else {
            showNotification('Please fill in all required fields.', 'error');
        }
    });

    // Add click effects to buttons
    $('.btn').on('click', function(e) {
        let ripple = $('<span class="ripple"></span>');
        $(this).append(ripple);

        let x = e.pageX - $(this).offset().left;
        let y = e.pageY - $(this).offset().top;

        ripple.css({
            left: x,
            top: y
        }).animate({
            opacity: 0,
            transform: 'scale(2)'
        }, 600, function() {
            $(this).remove();
        });
    });
});

// Initialize particles.js
function initializeParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#00d4ff'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#00d4ff',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Initialize typing animation
function initializeTyping() {
    if (typeof Typed !== 'undefined') {
        new Typed('.typing-text', {
            strings: [
                'Software Developer',
                'Java Developer',
                'Spring Boot Developer',
                'Web Developer',
                'Web Designer',
                'Problem Solver'
            ],
            typeSpeed: 100,
            backSpeed: 60,
            loop: true,
            showCursor: true,
            cursorChar: '|',
            smartBackspace: true
        });
    }
}

// Initialize counter animations
function initializeCounters() {
    const counters = document.querySelectorAll('.count');
    const options = {
        threshold: 0.7
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, options);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Initialize skill bar animations
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const options = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                skillBar.style.width = width;
                observer.unobserve(skillBar);
            }
        });
    }, options);

    skillBars.forEach(skillBar => {
        observer.observe(skillBar);
    });
}

// Achievement slider functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

function changeSlide(direction) {
    if (direction === 1) {
        nextSlide();
    } else {
        prevSlide();
    }
}

function currentSlideIndex(index) {
    currentSlide = index - 1;
    showSlide(currentSlide);
}

// Auto slide functionality
setInterval(nextSlide, 5000);

// Form validation
function validateForm(name, email, subject, message) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) return false;
    if (!email.trim() || !emailRegex.test(email)) return false;
    if (!message.trim()) return false;

    return true;
}

// Notification system
function showNotification(message, type) {
    const notification = $(`
        <div class="notification ${type}">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="close-btn">&times;</button>
        </div>
    `);

    $('body').append(notification);

    setTimeout(() => {
        notification.addClass('show');
    }, 100);

    setTimeout(() => {
        notification.removeClass('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);

    notification.find('.close-btn').click(() => {
        notification.removeClass('show');
        setTimeout(() => notification.remove(), 300);
    });
}

// Smooth scrolling easing
$.easing.easeInOutCubic = function(x, t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t + 2) + b;
};

// Add CSS for ripple effect and notifications
$('<style>').text(`
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }

    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--card-bg);
        backdrop-filter: blur(20px);
        color: var(--text-primary);
        padding: 1rem 2rem;
        border-radius: var(--border-radius);
        border: 1px solid rgba(255, 255, 255, 0.1);
        display: flex;
        align-items: center;
        gap: 1rem;
        transform: translateX(100%);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 10000;
        max-width: 400px;
        box-shadow: 0 10px 30px var(--shadow-dark);
    }

    .notification.show {
        transform: translateX(0);
        opacity: 1;
    }

    .notification.success {
        border-left: 4px solid #4CAF50;
    }

    .notification.error {
        border-left: 4px solid #f44336;
    }

    .notification .close-btn {
        background: none;
        border: none;
        color: var(--text-secondary);
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: auto;
        transition: color 0.3s ease;
    }

    .notification .close-btn:hover {
        color: var(--text-primary);
    }

    header.scrolled {
        background: rgba(10, 10, 10, 0.98);
        backdrop-filter: blur(30px);
    }

    .navbar ul li a.active {
        color: var(--primary-color) !important;
        background: rgba(0, 212, 255, 0.1);
    }

    @media (max-width: 768px) {
        .notification {
            right: 10px;
            left: 10px;
            transform: translateY(-100%);
        }

        .notification.show {
            transform: translateY(0);
        }
    }
`).appendTo('head');

// Performance optimization
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    const scrolled = $(window).scrollTop();

    // Update active navigation
    let current = '';
    $('section').each(function() {
        const sectionTop = $(this).offset().top;
        if (pageYOffset >= sectionTop - 200) {
            current = $(this).attr('id');
        }
    });

    $('header .navbar ul li a').removeClass('active');
    $('header .navbar ul li a[href="#' + current + '"]').addClass('active');

    // Header background
    if (scrolled > 100) {
        $('header').addClass('scrolled');
    } else {
        $('header').removeClass('scrolled');
    }
}, 16); // ~60fps

$(window).scroll(optimizedScrollHandler);

// Preload critical images
const preloadImages = [
    'images/user.jpg',
    'images/homebg.jpg',
    'images/project1.jpg',
    'images/project2.jpg',
    'images/tcs.jpg',
    'images/unified.jpg'
];

preloadImages.forEach(src => {
    const img = new Image();
    img.src = src;
});

// Service Worker registration for better performance
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}