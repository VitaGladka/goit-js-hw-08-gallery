// Импорт массива
import pictures from "../pictures-items.js";

// Находим данные в HTML
const galleryContainer = document.querySelector(".js-gallery");
const modalWindow = document.querySelector(".js-lightbox");
const modalPicture = document.querySelector(".lightbox__image");
const closeModalWindow = document.querySelector(
  '[data-action="close-lightbox"]',
);
const lightBoxOverlay = document.querySelector(".lightbox__overlay");
const arrowLeft = document.querySelector(".arrow_container > .left");
const arrowRight = document.querySelector(".arrow_container > .right");
let imageIndex = 1;

// Создали разметку, вставили в ul
const createGallery = galleryCard(pictures);
galleryContainer.insertAdjacentHTML("beforeend", createGallery);

// Добавили  EventListener
// открытие
// закрытие по кнопке*
// закрытие по области рядом
galleryContainer.addEventListener("click", openClickModal);
closeModalWindow.addEventListener("click", closeClickModal);
lightBoxOverlay.addEventListener("click", closeOverlay);
arrowLeft.addEventListener("click", clickArrowLeft);
arrowRight.addEventListener("click", clickArrowRight);

// Добавили разметку галереи
function galleryCard(pictures) {
  return pictures
    .map(({ preview, original, description }, index) => {
      return `<li class="gallery__item">
        <a
            class="gallery__link"
            href="${original}"
        >
        <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            data-small-index="${index + 1}"
            alt="${description}"
        />
    </a>
</li>`;
    })
    .join("");
}

// Открытие модального окна
function openClickModal(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== "IMG") return;

  imageIndex = evt.target.getAttribute("data-small-index");
  openWithIndex();
}

function openWithIndex() {
  modalWindow.classList.add("is-open");
  modalPicture.src = pictures[imageIndex - 1].original;
  modalPicture.alt = pictures[imageIndex - 1].description;
  //   modalPicture.setAttribute("data-big-index", imageIndex);

  galleryContainer.addEventListener("keydown", EscCloseModal);

  if (parseInt(imageIndex) === 1) {
    arrowLeft.classList.add("hidden");
  }

  if (parseInt(imageIndex) === pictures.length) {
    arrowRight.classList.add("hidden");
  }
}

//Закрытие модалки по клику
function closeClickModal() {
  modalWindow.classList.remove("is-open");
  modalPicture.src = "";
  modalPicture.alt = "";

  galleryContainer.removeEventListener("keydown", EscCloseModal);
}

//Закрытие модалки по эскейпу
function EscCloseModal(evt) {
  if (evt.code !== "Escape") return;
  closeClickModal();
}

//Закрытие модалки по нажатию на оверлей
function closeOverlay(evt) {
  if (evt.target.nodeName == "IMG") return;
  closeClickModal();
}

// Клик на левую стрелку
function clickArrowLeft() {
  closeClickModal();
  imageIndex -= 1;
  openWithIndex();

  if (imageIndex === 1) {
    arrowLeft.classList.add("hidden");
  } else {
    arrowRight.classList.remove("hidden");
  }
}

// Клик на правую стрелку
function clickArrowRight() {
  closeClickModal();
  imageIndex = parseInt(imageIndex) + 1;
  openWithIndex();

  if (imageIndex === pictures.length) {
    arrowRight.classList.add("hidden");
  } else {
    arrowLeft.classList.remove("hidden");
  }
}
