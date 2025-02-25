// Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        navMenu.classList.remove('active');

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Active navigation highlight
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Function to create memory cards
function createMemoryCard(image, title, date, description) {
    return `
        <div class="memory-card">
            <img src="${image}" alt="${title}">
            <div class="memory-card-content">
                <div class="memory-card-date">${date}</div>
                <h3>${title}</h3>
                <p>${description}</p>
            </div>
        </div>
    `;
}

// Example function to add memories (you'll modify this with your actual content)
function addMemories() {
    // This is a placeholder. You'll replace these with your actual memories
    const memoriesContainer = document.querySelector('#places .memory-grid');
    if (memoriesContainer) {
        // Example memory card - you'll replace these with your actual content
        memoriesContainer.innerHTML += createMemoryCard(
            'assets/images/placeholder.jpg',
            'Example Location',
            'January 2024',
            'Description of your memory here...'
        );
    }
}

// Super simple lightbox - GUARANTEED TO WORK VERSION
document.write(`
<script>
(function() {
    // Create lightbox element
    var lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    document.body.appendChild(lightbox);
    
    // Add click handlers to all images
    function addClickToImages() {
        var allImages = document.getElementsByTagName('img');
        for (var i = 0; i < allImages.length; i++) {
            allImages[i].onclick = function() {
                console.log("Image clicked!");
                lightbox.innerHTML = '<img src="' + this.src + '">';
                lightbox.style.display = 'flex';
                return false;
            };
        }
    }
    
    // Close lightbox when clicking it
    lightbox.onclick = function() {
        this.style.display = 'none';
    };
    
    // Add click handlers when DOM is ready
    if (document.readyState === 'complete') {
        addClickToImages();
    } else {
        window.onload = addClickToImages;
    }
    
    // Also try with a delay to catch any late-loaded images
    setTimeout(addClickToImages, 1000);
})();
</script>
`);

// Lazy loading for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}); 