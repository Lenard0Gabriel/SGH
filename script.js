document.addEventListener("DOMContentLoaded", function() {
    const carouselSlide = document.querySelector(".carousel-slide");
    const slides = document.querySelectorAll(".carousel-slide img");

    let counter = 1; // Start from the first original slide
    const size = slides[0].clientWidth;

    // Clone the first and last slides
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);

    firstClone.id = 'first-clone';
    lastClone.id = 'last-clone';

    carouselSlide.appendChild(firstClone);
    carouselSlide.insertBefore(lastClone, slides[0]);

    const updatedSlides = document.querySelectorAll(".carousel-slide img");
    carouselSlide.style.transform = `translateX(${-size * counter}px)`;

    function updateSlidePosition() {
        carouselSlide.style.transform = `translateX(${-size * counter}px)`;
    }

    function moveToNextSlide() {
        if (counter >= updatedSlides.length - 1) return;
        counter++;
        carouselSlide.style.transition = "transform 0.5s ease-in-out";
        updateSlidePosition();
    }

    function moveToPrevSlide() {
        if (counter <= 0) return;
        counter--;
        carouselSlide.style.transition = "transform 0.5s ease-in-out";
        updateSlidePosition();
    }

    carouselSlide.addEventListener('transitionend', () => {
        if (updatedSlides[counter].id === 'first-clone') {
            carouselSlide.style.transition = "none";
            counter = 1;
            updateSlidePosition();
        }
        if (updatedSlides[counter].id === 'last-clone') {
            carouselSlide.style.transition = "none";
            counter = updatedSlides.length - 2;
            updateSlidePosition();
        }
    });

    setInterval(moveToNextSlide, 3000);
});
