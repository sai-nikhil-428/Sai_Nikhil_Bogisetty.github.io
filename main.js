document.addEventListener("DOMContentLoaded", function () {
    let navLinks = document.querySelectorAll("ul li a");
    const navbar = document.querySelector("header");
    let lastScrollTop = 0;

    // **Smooth scrolling & dynamic title update on link click**
    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            // Open "About" section in a new window
            if (targetId === "about") {
                const aboutContent = document.querySelector("#about").innerHTML;
                const aboutWindow = window.open("", "_blank");
                aboutWindow.document.write(`
                    <html>
                    <head>
                        <title>About</title>
                        <style>
                            body { font-family: Arial, sans-serif; background: #f0f0f0; padding: 20px; }
                            h1 { font-size: 2rem; color: #333; }
                            .content { font-size: 1.2rem; color: #666; }
                        </style>
                    </head>
                    <body>
                        <h1>About Me</h1>
                        <div class="content">${aboutContent}</div>
                    </body>
                    </html>
                `);
                aboutWindow.document.close();
                return;
            }

            // Change page title dynamically
            document.title = link.getAttribute("data-title") || "Website";

            // Smooth scroll to the section
            if (targetElement) {
                window.scrollTo({ top: targetElement.offsetTop - 50, behavior: "smooth" });
            }
        });
    });

    // **Highlight active nav link while scrolling**
    window.addEventListener("scroll", function () {
        let fromTop = window.scrollY;

        navLinks.forEach(link => {
            let section = document.querySelector(link.hash);
            if (section) {
                if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
                    link.classList.add("menuactive");
                } else {
                    link.classList.remove("menuactive");
                }
            }
        });

        // **Sticky Navbar**
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // **Dynamic Title Change on Section Scroll**
    const sections = document.querySelectorAll("section");
    window.addEventListener("scroll", function () {
        let currentSection = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 100) {
                currentSection = section.getAttribute("id");
            }
        });
        if (currentSection) {
            document.title = currentSection.charAt(0).toUpperCase() + currentSection.slice(1);
        }
    });

    // **Owl Carousel Initialization**
    $(".owl-carousel").owlCarousel({
        loop: true,
        margin: 20,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        responsive: {
            0: { items: 1 },
            600: { items: 2 },
            1000: { items: 3 }
        }
    });

    // **Fixing Carousel Dot Functionality**
    const dots = document.querySelectorAll(".owl-dot");
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            $(".owl-carousel").trigger("to.owl.carousel", [index, 400]);
        });
    });
});


document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', function(event) {
        window.open(this.href, '_blank');
    });
});
