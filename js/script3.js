import galleryItems from '../gallery-items.js';

const listContainer = document.querySelector('.js-gallery');
const lightboxButtonEl = document.querySelector('[data-action="close-lightbox"]');
const lightboxImageEl = document.querySelector(".lightbox__image");
const backdropEl = document.querySelector('.lightbox__overlay');
const lightBoxEl = document.querySelector('.js-lightbox');
const lightBoxContentEl = document.querySelector('.lightbox__content');

const cardImagesGallery = createImagesGallery(galleryItems);

listContainer.insertAdjacentHTML('beforeend', cardImagesGallery);
listContainer.addEventListener('click', onGalleryContainerClick);

function createImagesGallery() {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join('');
}

function stopDefAction(evt) {
  evt.preventDefault();
}

function onGalleryContainerClick(evt) {
  stopDefAction(evt);
  
  if (evt.target.nodeName !== 'IMG') {
    return;
  } else {
    evt.stopPropagation();
    lightBoxEl.classList.add('is-open');

    lightboxButtonEl.addEventListener('click', modalCloseEl);
    window.addEventListener('keydown', onKeyPress);
    backdropEl.addEventListener('click', modalCloseEl);
    
    lightboxImageEl.src = evt.target.dataset.source;
    lightboxImageEl.alt = evt.target.alt;
   
    lightBoxContentEl.insertAdjacentHTML('beforeend', '<button type="button" class="leftscroll js-leftscroll" data-action="left-scroll"></button> <button type="button" class="rightscroll js-rightscroll" data-action="right-scroll"></button>');

    const leftScrollBtn = document.querySelector('[data-action="left-scroll"]');
    const rightScrollBtn = document.querySelector('[data-action="right-scroll"]');

      leftScrollBtn.addEventListener('click', function (evt) {
  if (evt.target.classList.contains("js-leftscroll")) {
    goToPreviousImage(originalUrls, lightboxImageEl.src);
    }
      });
    
    rightScrollBtn.addEventListener('click', function (evt) {
  if (evt.target.classList.contains("js-rightscroll")) {
    goToNextImage(originalUrls, lightboxImageEl.src);
    }
  });
  }
}
    
function modalCloseEl() {
  lightBoxEl.classList.remove("is-open");
  lightboxImageEl.src = ' ';
  document.querySelector('[data-action="left-scroll"]').remove();
  document.querySelector('[data-action="right-scroll"]').remove();
}

const originalUrls = galleryItems.map(({ original }) => original);

function goToPreviousImage(array, url) {

  for (let i = 0; i < array.length; i++) {
    if (url === array[i] && i > 0) {
      console.log([i]);
      lightboxImageEl.src = array[i-1];
      console.log(lightboxImageEl.src);
      document.querySelector('[data-action="left-scroll"]').classList.remove('is-hidden');
    } 
  }
}
function goToNextImage(array, url) {

  for (let i = 0; i < array.length; i++) {
    if (url === array[i] && i < array.length-1) {
      console.log([i]);
      lightboxImageEl.src = array[i+1];
      console.log(lightboxImageEl.src);}
  }
}

function onKeyPress(evt) {
  const ESC_KEY_CODE = 'Escape';
  const LEFT_KEY_CODE = 'ArrowLeft';
  const RIGHT_KEY_CODE = 'ArrowRight';
  
  const isEscKey = evt.code === ESC_KEY_CODE;
  const isLeftKey = evt.code === LEFT_KEY_CODE;
  const isRightKey = evt.code === RIGHT_KEY_CODE;
  
  if (isEscKey) {
    modalCloseEl();
  } else if (isLeftKey) {
    goToPreviousImage(originalUrls, lightboxImageEl.src);
  } else if (isRightKey) {
    goToNextImage(originalUrls, lightboxImageEl.src);
  }
}