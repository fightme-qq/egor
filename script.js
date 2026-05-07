const galleries = {
  hotel: [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(
    (number) => `assets/photos/hotel-${String(number).padStart(2, "0")}.jpg`,
  ),
  investment: [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(
    (number) => `assets/photos/investment-${String(number).padStart(2, "0")}.jpg`,
  ),
};

const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox.querySelector("img");
const counter = lightbox.querySelector(".lightbox-counter");
const closeButton = lightbox.querySelector(".lightbox-close");
const prevButton = lightbox.querySelector(".prev");
const nextButton = lightbox.querySelector(".next");

let activeGallery = "hotel";
let activeIndex = 0;

function renderLightbox() {
  const photos = galleries[activeGallery];
  lightboxImage.src = photos[activeIndex];
  lightboxImage.alt = `Фото объекта ${activeIndex + 1}`;
  counter.textContent = `${activeIndex + 1} / ${photos.length}`;
}

function openGallery(name) {
  activeGallery = name;
  activeIndex = 0;
  renderLightbox();
  lightbox.showModal();
}

function moveGallery(direction) {
  const photos = galleries[activeGallery];
  activeIndex = (activeIndex + direction + photos.length) % photos.length;
  renderLightbox();
}

document.querySelectorAll("[data-open-gallery]").forEach((button) => {
  button.addEventListener("click", () => openGallery(button.dataset.openGallery));
});

closeButton.addEventListener("click", () => lightbox.close());
prevButton.addEventListener("click", () => moveGallery(-1));
nextButton.addEventListener("click", () => moveGallery(1));

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.close();
  }
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.open) return;
  if (event.key === "ArrowLeft") moveGallery(-1);
  if (event.key === "ArrowRight") moveGallery(1);
});
