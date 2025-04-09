// List of image paths
const images = [
  "images/image1.jpeg",
  "images/image2.jpeg",
  "images/image3.jpeg",
  "images/image4.jpeg",
  "images/image5.jpeg"
];

// Current index of the image being shown
let index = 0;

// Getting DOM elements
const imgElement = document.getElementById("slider-image");
const counterElement = document.getElementById("counter");
const playPauseBtn = document.getElementById("play-pause");

// Slideshow control variables
let isPlaying = true;
let slideshowInterval;

/**
 * Displays the current image and applies fade transition
 */
function showImage() {
  // Fade out
  imgElement.classList.remove("show");

  // Wait for fade-out before switching image
  setTimeout(() => {
    imgElement.src = images[index];
    counterElement.textContent = `Image ${index + 1} of ${images.length}`;

    // Slight delay before applying fade-in
    setTimeout(() => {
      imgElement.classList.add("show");
    }, 20);
  }, 500);
}

/**
 * Moves to the next image
 */
function nextImage() {
  index = (index + 1) % images.length;
  showImage();
}

/**
 * Moves to the previous image
 */
function prevImage() {
  index = (index - 1 + images.length) % images.length;
  showImage();
}

/**
 * Starts automatic slideshow
 */
function startSlideshow() {
  slideshowInterval = setInterval(nextImage, 3000);
  playPauseBtn.textContent = "Pause";
  isPlaying = true;
}

/**
 * Stops automatic slideshow
 */
function stopSlideshow() {
  clearInterval(slideshowInterval);
  playPauseBtn.textContent = "Play";
  isPlaying = false;
}

// Touch events for swipe gesture support on mobile
let startX = 0;

imgElement.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

imgElement.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) {
    nextImage(); // swipe left
  } else if (endX - startX > 50) {
    prevImage(); // swipe right
  }
});

// Initial setup: show first image and start slideshow
showImage();
startSlideshow();

// Button event listeners
document.querySelector(".next").addEventListener("click", nextImage);
document.querySelector(".prev").addEventListener("click", prevImage);

playPauseBtn.addEventListener("click", () => {
  if (isPlaying) {
    stopSlideshow();
  } else {
    startSlideshow();
  }
});
