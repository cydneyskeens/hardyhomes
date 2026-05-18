/* Hardy Homes — main.js */

// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
}

// ── Mobile hamburger ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
    });
    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
}

// ── Reveal on scroll ──
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

// ── Stripe checkout modal ──
let currentProduct = null;

function handleStripeCheckout(id, price, name) {
    currentProduct = { id, price, name };
    document.getElementById('modalTitle').textContent = name;
    document.getElementById('modalDesc').textContent = `Complete your purchase below. Hardy Homes will confirm your order and delivery details within 1 business day.`;
    document.getElementById('modalTotal').textContent = `Order Total: $${price.toLocaleString()} USD`;
    document.getElementById('stripeModal').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('stripeModal').classList.remove('open');
    document.body.style.overflow = '';
}

// Close modal on backdrop click
const modal = document.getElementById('stripeModal');
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

// ESC key closes modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

function submitPayment() {
    // In production: replace this with your Stripe Payment Intent or Stripe Checkout link
    // e.g. window.location.href = 'https://buy.stripe.com/your_link_here';
    // Or use Stripe.js: stripe.redirectToCheckout({ lineItems: [...], mode: 'payment', ... });

    const btn = document.querySelector('.modal-pay-btn');
    btn.textContent = '⏳ Processing...';
    btn.disabled = true;

    setTimeout(() => {
        closeModal();
        btn.disabled = false;
        btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Complete Secure Purchase`;

        // Show success toast
        showToast(`✅ Order received! We'll email you shortly with confirmation.`);
    }, 1800);
}

// ── Toast notification ──
function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(80px);
        background: #1e1c1a;
        color: white;
        padding: 14px 24px;
        border-radius: 8px;
        font-family: 'DM Sans', sans-serif;
        font-size: 0.9rem;
        font-weight: 500;
        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        z-index: 99999;
        transition: transform 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease;
        opacity: 0;
        max-width: 90vw;
        text-align: center;
        border-left: 3px solid #635bff;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.transform = 'translateX(-50%) translateY(0)';
        toast.style.opacity = '1';
    });

    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(80px)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

// ── Contact form ──
function handleContactForm(e) {
    e.preventDefault();
    const successEl = document.getElementById('cfSuccess');
    const btn = e.target.querySelector('button[type="submit"]');

    btn.textContent = 'Sending…';
    btn.disabled = true;

    // Simulate send (replace with fetch to your form endpoint)
    setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.disabled = false;
        successEl.classList.add('show');
        e.target.reset();
        setTimeout(() => successEl.classList.remove('show'), 6000);
    }, 1200);
}

// ── Smooth scroll for anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const id = a.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
