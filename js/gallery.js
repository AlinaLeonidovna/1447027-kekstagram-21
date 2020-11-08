'use strict';

(() => {
  const photosElement = document.querySelector(`.pictures`);
  const photosTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);
  let currentPicturesList = [];

  // Функция создаст DOM-элементы, соответствующие фотографиям и заполняет их данными
  const createPhotos = (photo) => {
    const photoElement = photosTemplate.cloneNode(true);

    photoElement.querySelector(`.picture__img`).src = photo.url;
    photoElement.querySelector(`.picture__likes`).textContent = photo.likes;
    photoElement.querySelector(`.picture__comments`).textContent = photo.comments.length;

    return photoElement;
  };

  const onPhotoClick = (evt) => {
    if (evt.target && evt.target.matches(`img[class = picture__img]`)) {
      bigPhoto.querySelector(`.big-picture__img img`).src = evt.target.src;

      openBigPhoto();
    }
  };

  const onPhotoKeydown = (evt) =>{
    if (evt.key === `Enter`) {
      for (let i = 0; i < photosElement.length; i++) {
        const photo = photosElement[i];
        if (photo === document.activeElement) {
          bigPhoto.querySelector(`.big-picture__img img`).src = photo.querySelector(`.big-picture__img img`).src;

          openBigPhoto();
        }
      }
    }
  };

  //  Функция отрисует сгенерированные DOM-элементы (25 фото)
  const createPicturesList = (photos) => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < photos.length; i++) {
      const createdPhoto = createPhotos(photos[i]);
      fragment.appendChild(createdPhoto);

      createdPhoto.addEventListener(`click`, onPhotoClick);
      createdPhoto.addEventListener(`keydown`, onPhotoKeydown);
    }

    return fragment;
  };

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

  const bigPhoto = document.querySelector(`.big-picture`);
  const closeButtonBigImg = bigPhoto.querySelector(`#picture-cancel`);

  // Функция создаст DOM-элементы и заполнит их данными
  const renderBigPhoto = (photos) => {
    bigPhoto.querySelector(`.big-picture__img img`).src = photos.url;
    bigPhoto.querySelector(`.likes-count`).textContent = photos.likes;
    bigPhoto.querySelector(`.social__caption`).textContent = photos.description;
    bigPhoto.querySelector(`.comments-count`).textContent = photos.comments.length;

    bigPhoto.querySelector(`.social__comment-count`).classList.add(`hidden`);
    bigPhoto.querySelector(`.comments-loader`).classList.add(`hidden`);

    createCommentsList(photos.comments);
  };

  // Просмотр любого изображения в полноэкранном режиме
  const openBigPhoto = () => {
    renderBigPhoto(currentPicturesList[0]);
    bigPhoto.classList.remove(`hidden`);
    closeButtonBigImg.addEventListener(`click`, closeBigPhoto);
    document.addEventListener(`keydown`, window.utils.onModalOpenKeydown);
    document.querySelector(`body`).classList.add(`modal-open`);
  };

  const closeBigPhoto = () => {
    bigPhoto.classList.add(`hidden`);
    closeButtonBigImg.removeEventListener(`click`, closeBigPhoto);
    document.removeEventListener(`keydown`, window.utils.onModalOpenKeydown);
    document.querySelector(`body`).classList.remove(`modal-open`);
  };

  window.gallery = {
    currentPicturesList,
    createPicturesList,
    createCommentsList,
    closeBigPhoto,
    photosElement
  };
})();
