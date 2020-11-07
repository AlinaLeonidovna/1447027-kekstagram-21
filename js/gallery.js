'use strict';

// Модуль для отрисовки миниатюр и увеличенного изображения
(() => {
  const photosElement = document.querySelector(`.pictures`);
  // Находим шаблон и получаем содержимое шаблона типа documentFragment
  const photosTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);

  // Функция создаст DOM-элементы, соответствующие фотографиям и заполняет их данными
  const createPhotos = (photo) => {
    // Копируем шаблон со всеми потомками в новую переменную
    const photoElement = photosTemplate.cloneNode(true);

    photoElement.querySelector(`.picture__img`).src = photo.url;
    photoElement.querySelector(`.picture__likes`).textContent = photo.likes;
    photoElement.querySelector(`.picture__comments`).textContent = photo.comments.length;

    return photoElement;
  };

  const onPhotoElementClick = (evt) => {
    if (evt.target && evt.target.matches(`img[class = picture__img]`)) {
      bigPhotoElement.querySelector(`.big-picture__img img`).src = evt.target.src;

      openBigPhotoElement();
    }
  };

  const onPhotoElementKeydown = (evt) =>{
    if (evt.key === `Enter`) {
      for (let i = 0; i < photosElement.length; i++) {
        const photo = photosElement[i];
        if (photo === document.activeElement) {
          bigPhotoElement.querySelector(`.big-picture__img img`).src = photo.querySelector(`.big-picture__img img`).src;
          openBigPhotoElement();
        }
      }
    }
  };

  //  Функция отрисует сгенерированные DOM-элементы (25 фото)
  const createPicturesList = (photos) => {
    //  инициализируем новый фрагмент
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < photos.length; i++) {
      const createdPhoto = createPhotos(photos[i]);
      fragment.appendChild(createdPhoto);

      createdPhoto.addEventListener(`click`, onPhotoElementClick);
      createdPhoto.addEventListener(`keydown`, onPhotoElementKeydown);
    }
    //  возвращает все сгенерированные DOM-элементы
    return fragment;
  };

  //  отрисует все сгенерированные DOM-элементы
  // photosElement.appendChild(createPicturesList(window.data.createPhotoDescription(25)));

  let currentPicturesList = [];

  const onDataLoad = (data) => {
    const picturesList = createPicturesList(data);

    photosElement.append(picturesList);

    currentPicturesList = data;
  };

  const onLoadError = (error) => {
    window.backend.errorHandler(error);
  };

  window.backend.load(onDataLoad, onLoadError);

  const commentsList = document.querySelector(`.social__comments`);
  const commentsItem = commentsList.querySelector(`.social__comment`);

  // Функция создает один комментарий
  const createCommentItem = (comments) => {
    const commentElement = commentsItem.cloneNode(true);

    commentElement.querySelector(`.social__picture`).src = comments.avatar;
    commentElement.querySelector(`.social__picture`).alt = comments.name;
    commentElement.querySelector(`.social__text`).textContent = comments.message;

    return commentElement;
  };

  // Функция отрисует сгенерированные DOM-элементы
  const createCommentsList = (comment) => {
    commentsList.innerHTML = ``;
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < comment.length; i++) {
      fragment.appendChild(createCommentItem(comment[i]));
    }

    commentsList.appendChild(fragment);
  };

  const bigPhotoElement = document.querySelector(`.big-picture`);
  const closeButtonBigImg = bigPhotoElement.querySelector(`#picture-cancel`);

  // Функция создаст DOM-элементы и заполнит их данными
  const renderBigPhotoElement = (photos) => {
    bigPhotoElement.querySelector(`.big-picture__img img`).src = photos.url;
    bigPhotoElement.querySelector(`.likes-count`).textContent = photos.likes;
    bigPhotoElement.querySelector(`.social__caption`).textContent = photos.description;
    bigPhotoElement.querySelector(`.comments-count`).textContent = photos.comments.length;

    bigPhotoElement.querySelector(`.social__comment-count`).classList.add(`hidden`);
    bigPhotoElement.querySelector(`.comments-loader`).classList.add(`hidden`);

    createCommentsList(photos.comments);
  };

  // Просмотр любого изображения в полноэкранном режиме

  const openBigPhotoElement = () => {
    renderBigPhotoElement(currentPicturesList[0]);
    bigPhotoElement.classList.remove(`hidden`);
    closeButtonBigImg.addEventListener(`click`, closeBigPhotoElement);
    document.addEventListener(`keydown`, window.utils.onModalOpenKeydown);
    document.querySelector(`body`).classList.add(`modal-open`);
  };

  const closeBigPhotoElement = () => {
    bigPhotoElement.classList.add(`hidden`);
    closeButtonBigImg.removeEventListener(`click`, closeBigPhotoElement);
    document.removeEventListener(`keydown`, window.utils.onModalOpenKeydown);
    document.querySelector(`body`).classList.remove(`modal-open`);
  };

  window.gallery = {
    currentPicturesList,
    createPicturesList,
    createCommentsList,
    closeBigPhotoElement,
    photosElement
  };
})();
