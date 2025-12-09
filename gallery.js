// Select images & lightbox components
const images = document.querySelectorAll(".masonry-gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close-lightbox");

// When an image is clicked: open lightbox
images.forEach(img => {
    img.addEventListener("click", () => {
        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
    });
});

// Close when clicking X
closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
});

// Close when clicking outside image
lightbox.addEventListener("click", e => {
    if (e.target === lightbox) {
        lightbox.style.display = "none";
    }
});
