'use strict';

const PHOTOS_QUANTITY = 25;

const Likes = {
  MIN: 15,
  MAX: 200
};

const AvatarsNumber = {
  MIN: 1,
  MAX: 6
};

const CommentsQuantity = {
  MIN: 0,
  MAX: 6
};

const MESSAGES = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
];

const NAMES = [
  `Аня`,
  `Богдан`,
  `Вика`,
  `Гриша`,
  `Даша`,
  `Егор`,
  `Жанна`,
  `Захар`,
  `Инга`,
  `Костя`
];

let comments = [];
const photos = [];
const photosElement = document.querySelector(`.pictures`);
const photosTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);

// Функция возвращает случайное число
function getRandomNumber(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}
// const getRandomNumber = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

// Функция возвращает случайный элемент массива
function getRandomArrayElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}
// const getRandomArrayElement = (array) => array[Math.floor(Math.random() * array.length)];

// Функция создает список комментариев
function createComments() {
  for (let i = 0; i < getRandomNumber(CommentsQuantity.MIN, CommentsQuantity.MAX); i++) {
    comments[i] = [
      {
        avatar: `img/avatar-${getRandomNumber(AvatarsNumber.MIN, AvatarsNumber.MAX)}.svg`,
        message: getRandomArrayElement(MESSAGES),
        name: getRandomArrayElement(NAMES)
      }
    ];
  }

  return comments;
}
/* const createComments = (quantity) => {
  for (let i = 0; i < quantity; i++) {
    comments[i] = {
      avatar: `img/avatar-${getRandomNumber(AvatarsNumber.MIN, AvatarsNumber.MAX)}.svg`,
      message: getRandomArrayElement(MESSAGES),
      name: getRandomArrayElement(NAMES)
    };
  }

  return comments;
}; */

// Функция создает описание фотографии
function createPhotoDescription(quantity) {
  for (let i = 0; i < quantity; i++) {
    photos[i] = {
      url: `photos/${getRandomNumber(1, PHOTOS_QUANTITY)}.jpg`,
      description: `описание фотографии`,
      likes: getRandomNumber(Likes.MIN, Likes.MAX),
      comments: createComments(getRandomNumber(CommentsQuantity.MIN, CommentsQuantity.MAX)).length
    };
  }

  return photos;
}
/* const createPhotoDescription = (quantity) => {
  for (let i = 0; i < quantity; i++) {
    photos[i] = {
      url: `photos/${getRandomNumber(1, PHOTOS_QUANTITY)}.jpg`,
      description: `описание фотографии`,
      likes: getRandomNumber(Likes.MIN, Likes.MAX),
      comments: createComments(getRandomNumber(CommentsQuantity.MIN, CommentsQuantity.MAX)).length
    };
  }

  return photos;
}; */
createPhotoDescription(PHOTOS_QUANTITY);

// Функция создаст DOM-элементы, соответствующие фотографиям и заполняет их данными
function createPhotos(photo) {
  const photoElement = photosTemplate.cloneNode(true);

  photoElement.querySelector(`.picture__img`).src = photo.url;
  photoElement.querySelector(`.picture__likes`).textContent = photo.likes;
  photoElement.querySelector(`.picture__comments`).textContent = photo.comments;

  return photoElement;
}

// Функция отрисует сгенерированные DOM-элементы
function createPicturesList(photo) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < photos.length; i++) {
    fragment.appendChild(createPhotos(photo[i]));
  }
  photosElement.appendChild(fragment);
}

createPicturesList(photos);
