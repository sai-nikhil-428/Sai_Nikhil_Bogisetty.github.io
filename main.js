document.addEventListener('DOMContentLoaded', function () {
    let navLinks = document.querySelectorAll('ul li a');
    let lastScrollTop = 0;  // Track the last scroll position
    const navbar = document.querySelector('header');  // Get the header element

    // Smooth scrolling and dynamic title change on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            // Prevent the default anchor behavior
            event.preventDefault();

            // If the "About" link is clicked, open the content in a new tab with only the About section
            if (link.getAttribute('href') === '#about') {
                // Get the content of the About section
                const aboutContent = document.querySelector('#about').innerHTML;
                
                // Open a new tab and inject the About section content
                const aboutWindow = window.open('', '_blank');
                aboutWindow.document.write(`
                    <html>
                    <head>
                        <title>About</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f0f0f0;
                                margin: 0;
                                padding: 20px;
                            }
                            h1 {
                                font-size: 2rem;
                                color: #333;
                            }
                            .content {
                                font-size: 1.2rem;
                                color: #666;
                            }
                        </style>
                    </head>
                    <body>
                        <h1>About Me</h1>
                        <div class="content">
                            ${aboutContent}
                        </div>
                    </body>
                    </html>
                `);
                aboutWindow.document.close(); // Close the document to render the content
                return;  // Don't execute the normal navigation code for the "About" link
            }

            // For other links, smooth scroll and dynamic title change
            const pageTitle = link.getAttribute('data-title');
            document.title = pageTitle;

            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50, // Adjust this offset if needed
                    behavior: 'smooth',
                });
            }
        });
    });

    // Highlight active navigation link while scrolling
    window.addEventListener('scroll', function () {
        let fromTop = window.scrollY;

        navLinks.forEach(link => {
            if (link.hash) {
                let section = document.querySelector(link.hash);
                if (section) {
                    if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
                        link.classList.add('menuactive');
                    } else {
                        link.classList.remove('menuactive');
                    }
                }
            }
        });

        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        if (currentScroll > lastScrollTop && currentScroll > navbar.offsetHeight) {
            navbar.style.top = `-${navbar.offsetHeight}px`;
        } else if (currentScroll < lastScrollTop && currentScroll <= navbar.offsetHeight) {
            navbar.style.top = "0";
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });
});

// Add a minimal export to make this a valid ES Module
export {};