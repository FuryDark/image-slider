const images = [
  "images/image1.jpeg",
  "images/image2.jpeg",
  "images/image3.jpeg",
  "images/image4.jpeg",
  "images/image5.jpeg"
];

let index = 0;
const imgElement = document.getElementById("slider-image");
const counterElement = document.getElementById("counter");
const playPauseBtn = document.getElementById("play-pause");

let isPlaying = true;
let slideshowInterval;

function showImage() {
  // Start fade-out
  imgElement.classList.remove("show");

  // Wait 500ms to match the CSS fade-out
  setTimeout(() => {
    imgElement.src = images[index];
    counterElement.textContent = `Image ${index + 1} of ${images.length}`;

    // After image updates, wait briefly then fade in
    setTimeout(() => {
      imgElement.classList.add("show");
    }, 20); // Just enough delay to trigger fade-in
  }, 500); // Exactly match the CSS duration
}


function nextImage() {
  index = (index + 1) % images.length;
  showImage();
}

function prevImage() {
  index = (index - 1 + images.length) % images.length;
  showImage();
}

function startSlideshow() {
  slideshowInterval = setInterval(nextImage, 3000);
  playPauseBtn.textContent = "Pause";
  isPlaying = true;
}

function stopSlideshow() {
  clearInterval(slideshowInterval);
  playPauseBtn.textContent = "Play";
  isPlaying = false;
}

// Touch events for swipe support
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

// Initial setup
showImage();
startSlideshow();

document.querySelector(".next").addEventListener("click", nextImage);
document.querySelector(".prev").addEventListener("click", prevImage);

playPauseBtn.addEventListener("click", () => {
  if (isPlaying) {
    stopSlideshow();
  } else {
    startSlideshow();
  }
});
