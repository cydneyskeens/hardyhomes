// Hardy Homes — gallery.js
// Lightbox for masonry gallery

const images = document.querySelectorAll('.masonry-gallery img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-lightbox');

images.forEach(img => {
    img.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        document.body.style.overflow = 'hidden';
    });
});

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    });
}

if (lightbox) {
    lightbox.addEventListener('click', e => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lightbox && lightbox.style.display === 'flex') {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    }
});
