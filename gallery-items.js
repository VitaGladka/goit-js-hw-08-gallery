// Импорт массива
const pictures = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];

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
