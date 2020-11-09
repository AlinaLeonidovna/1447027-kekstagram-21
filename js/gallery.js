'use strict';

(() => {
  const photosElement = document.querySelector(`.pictures`);
  const photosTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);
  let pictures = [];
  const bigPhoto = document.querySelector(`.big-picture`);
  const closeButtonBigImg = bigPhoto.querySelector(`#picture-cancel`);
  const commentsList = document.querySelector(`.social__comments`);
  const commentsItem = commentsList.querySelector(`.social__comment`);
  const commentsLoader = document.querySelector(`.comments-loader`);
  let currentComments = [];
  const COMMENTS_INDEX_STEP = 5;

  // Функция создаст DOM-элементы, соответствующие фотографиям и заполняет их данными
  const createPhoto = (photo) => {
    const photoElement = photosTemplate.cloneNode(true);

    photoElement.querySelector(`.picture__img`).src = photo.url;
    photoElement.querySelector(`.picture__likes`).textContent = photo.likes;
    photoElement.querySelector(`.picture__comments`).textContent = photo.comments.length;

    return photoElement;
  };

  //  Функция отрисует сгенерированные DOM-элементы
  const createPicturesList = (photos) => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < photos.length; i++) {
      const photo = photos[i];

      const createdPhoto = createPhoto(photo);
      fragment.appendChild(createdPhoto);

      createdPhoto.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        openBigPhoto(photo);
      });

      createdPhoto.addEventListener(`keydown`, (evt) => {
        if (evt.key === `Enter`) {
          evt.preventDefault();
          openBigPhoto(photo);
        }
      });
    }

    return fragment;
  };

  const onDataLoad = (data) => {
    pictures = data;
    renderPhotos(pictures);
  };

  const onLoadError = (error) => {
    window.backend.errorHandler(error);
  };

  window.backend.load(onDataLoad, onLoadError);

  // Функция создает один комментарий
  const createCommentItem = (comments) => {
    const commentElement = commentsItem.cloneNode(true);

    commentElement.querySelector(`.social__picture`).src = comments.avatar;
    commentElement.querySelector(`.social__picture`).alt = comments.name;
    commentElement.querySelector(`.social__text`).textContent = comments.message;

    return commentElement;
  };

  // Функция отрисует сгенерированные DOM-элементы
  const createCommentsList = (comments) => {
    const fragment = document.createDocumentFragment();
    for (let comment of comments) {
      fragment.appendChild(createCommentItem(comment));
    }

    return fragment;
  };

  const renderCommentsLimitedList = (comments) => {
    commentsList.appendChild(createCommentsList(comments));
  };

  // Функция создаст DOM-элементы и заполнит их данными
  const renderBigPhoto = (photo) => {
    bigPhoto.querySelector(`.big-picture__img img`).src = photo.url;
    bigPhoto.querySelector(`.likes-count`).textContent = photo.likes;
    bigPhoto.querySelector(`.social__caption`).textContent = photo.description;
    bigPhoto.querySelector(`.comments-count`).textContent = photo.comments.length;

    bigPhoto.querySelector(`.social__comment-count`).classList.add(`hidden`);
    bigPhoto.querySelector(`.comments-loader`).classList.add(`hidden`);

    bigPhoto.querySelector(`.social__comments`).childNodes.forEach((node) => node.remove());

    createCommentsList(photo.comments);
  };

  let quantityRenderedComments;

  const addComments = () => {
    quantityRenderedComments = quantityRenderedComments + COMMENTS_INDEX_STEP;
    renderCommentsLimitedList(currentComments.slice(quantityRenderedComments - COMMENTS_INDEX_STEP, quantityRenderedComments));

    if (quantityRenderedComments >= currentComments.length) {
      commentsLoader.removeEventListener(`click`, onButtonLoadComments);
      commentsLoader.classList.add(`hidden`);
    }


  };

  const onButtonLoadComments = () => {
    addComments();
  };

  // Просмотр любого изображения в полноэкранном режиме
  const openBigPhoto = (photo) => {
    bigPhoto.classList.remove(`hidden`);
    closeButtonBigImg.addEventListener(`click`, closeBigPhoto);
    document.addEventListener(`keydown`, window.utils.onModalOpenKeydown);
    document.querySelector(`body`).classList.add(`modal-open`);
    commentsLoader.addEventListener(`click`, onButtonLoadComments);
    if (photo.comments.length > COMMENTS_INDEX_STEP) {
      commentsLoader.classList.remove(`hidden`);
    }
    commentsList.innerHTML = ``;
    renderBigPhoto(photo);
    currentComments = photo.comments.slice();
    quantityRenderedComments = 0;
    addComments();
  };

  const closeBigPhoto = () => {
    bigPhoto.classList.add(`hidden`);
    closeButtonBigImg.removeEventListener(`click`, closeBigPhoto);
    document.removeEventListener(`keydown`, window.utils.onModalOpenKeydown);
    document.querySelector(`body`).classList.remove(`modal-open`);
  };

  const renderPhotos = (photos) => {
    removePictures();
    photosElement.append(createPicturesList(photos));
  };

  const removePictures = () => document.querySelectorAll(`.picture`).forEach((photo) => photo.remove());

  window.gallery = {
    getPictures: () => pictures.slice(),
    renderPhotos,
    closeBigPhoto,
  };
})();
