$(document).ready(function() {
    initScrollToTop();

    //sticky navigation-menu
    function stickyNav() {
        const scrollTop = $(window).scrollTop();
        const $header = $('header .navbar');

        if (scrollTop > 200) {
            $header.addClass('is-sticky shadow');
        } else {
            $header.removeClass('is-sticky shadow');
        }
    }
    stickyNav();
    $(window).on('scroll', stickyNav);

    // Smooth scroll for anchor links (same page)
    $('a[href^="#"]').on('click', function(e) {
        const targetId = this.getAttribute('href');

        // ignore empty hash or "#"
        if (targetId.length <= 1) return;

        const $target = $(targetId);
        if ($target.length) {
            e.preventDefault();

            $('html, body').stop().animate({
                scrollTop: $target.offset().top - getHeaderOffset()
            }, 800);
        }
    });


    // Smooth scroll when coming from another page with hash
    if (window.location.hash) {
        const hash = window.location.hash;

        setTimeout(function() {
            const $target = $(hash);
            if ($target.length) {
                $('html, body').stop().animate({
                    scrollTop: $target.offset().top - getHeaderOffset()
                }, 800);
            }
        }, 300); // wait for page layout
    }

    const sr = ScrollReveal({
        distance: '40px',
        duration: 600,
        easing: 'ease-out',
        origin: 'bottom',
        reset: false
    });

    // reveal items in initially active tab
    sr.reveal('.product-list-wrap .col', { interval: 100 });

    // reveal items when tab is shown
    document.querySelectorAll('[data-bs-toggle="tab"]').forEach(tabEl => {
        tabEl.addEventListener('shown.bs.tab', e => {
            const targetPane = document.querySelector(e.target.dataset.bsTarget);

            if (targetPane) {
                sr.reveal(targetPane.querySelectorAll('.product-list-wrap .col'), {
                    interval: 100
                });
            }
        });
    });

    AOS.init({
        duration: 1000,
        once: true,
    });

    Fancybox.bind("[data-fancybox]", {
        Carousel: {
            Zoomable: {
                Panzoom: {
                    clickAction: "iterateZoom",
                    maxScale: 2,
                },
            },
        },
    });

    const carousel = document.querySelector('#heroCarousel');
    const bullets = document.querySelectorAll('.custom-pagination span');

    if (carousel && bullets.length) {
        carousel.addEventListener('slid.bs.carousel', function(e) {
            bullets.forEach(b => b.classList.remove('active'));

            if (bullets[e.to]) {
                bullets[e.to].classList.add('active');
            }
        });
    }

});



function getHeaderOffset() {
    const $header = $('.header-navigation');
    return $header.length ? $header.outerHeight() : 0;
}


// Scroll to top button functionality
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}


function initScrollToTop() {
    const $topButton = $('.topTop');
    if (!$topButton.length) return;

    $(window).scroll(debounce(function() {
        const scrollTop = $(window).scrollTop();
        const docHeight = $(document).height();
        const winHeight = $(window).height();
        const scrollPercent = Math.round((scrollTop / (docHeight - winHeight)) * 100);

        $topButton.css({
            opacity: scrollPercent > 15 ? 1 : 0,
            transform: scrollPercent > 15 ? 'translateY(0)' : 'translateY(calc(100% + 5px))'
        });
    }, 100));

    $topButton.click(function() {
        $('html, body').stop().animate({ scrollTop: 0 }, 1000);
        return false;
    });
}