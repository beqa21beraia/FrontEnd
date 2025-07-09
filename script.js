/* ============== COOKIE NOTIFICATION ============== */
if (!localStorage.getItem('cookiesAccepted')) {
    const cookieBanner = document.createElement('div');
    cookieBanner.className = 'cookie-banner';
    cookieBanner.innerHTML = `
        <p>We use cookies to enhance your experience.</p>
        <button id="accept-cookies">ACCEPT</button>
    `;
    document.body.prepend(cookieBanner);
    
    document.getElementById('accept-cookies').addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieBanner.remove();
    });
}


/* ============== FETCH CHIPS PRODUCTS ============== */
async function getChipsProducts() {
    try {
        const response = await fetch('https://api.spoonacular.com/food/products/search?query=chips&apiKey=YOUR_API_KEY&number=3');
        const data = await response.json();
        
        const container = document.createElement('div');
        container.className = 'chips-products';
        container.innerHTML = '<h3>Popular Chips:</h3>';
        
        data.products.forEach(product => {
            container.innerHTML += `
                <div class="chip-item">
                    <img src="https://spoonacular.com/productImages/${product.id}-90x90" alt="${product.title}" loading="lazy">
                    <p>${product.title}</p>
                </div>
            `;
        });
        
        document.querySelector('.register').after(container);
    } catch (error) {
        console.log('Error loading chips:', error);
        const container = document.createElement('div');
        container.className = 'chips-products';
        container.innerHTML = '<p>Discover our delicious chips selection!</p>';
        document.querySelector('.register').after(container);
    }
}

/* ============== HEADER SHADOW ON SCROLL ============== */
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    header.classList.toggle('shadow-header', window.scrollY >= 40);
});

/* ============== SCROLL TO TOP ============== */
window.addEventListener('scroll', () => {
    const scrollUp = document.getElementById('scroll-up');
    if (scrollUp) {
        scrollUp.classList.toggle('show-scroll', window.scrollY >= 313);
    }
});

document.getElementById('scroll-up')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============== MOBILE MENU TOGGLE ============== */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

// Toggle menu
if (navToggle) navToggle.addEventListener('click', () => navMenu.classList.add('show-menu'));
if (navClose) navClose.addEventListener('click', () => navMenu.classList.remove('show-menu'));

// Close menu when clicking links
document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('show-menu'));
});

// Initialize when page loads
window.addEventListener('DOMContentLoaded', () => {
    getChipsProducts();
});