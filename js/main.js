'use strict';

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

// Функция возвращает случайное число включая min и max
const getRandomNumber = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

// Функция создает список комментариев
const createComments = (quantity) => {
  const comments = [];
  for (let i = 0; i < quantity; i++) {
    const comment = {
      avatar: `img/avatar-${getRandomNumber(AvatarsNumber.MIN, AvatarsNumber.MAX)}.svg`,
      message: MESSAGES[getRandomNumber(0, MESSAGES.length - 1)],
      name: NAMES[getRandomNumber(0, NAMES.length - 1)]
    };
    comments.push(comment);
  }
  return comments;
};

// Функция создает описание фотографии
const createPhotoDescription = (quantity) => {
  const photos = [];
  for (let i = 0; i < quantity; i++) {
    const photo = {
      url: `photos/${getRandomNumber(1, 25)}.jpg`,
      description: `описание фотографии`,
      likes: getRandomNumber(Likes.MIN, Likes.MAX),
      comments: createComments(getRandomNumber(CommentsQuantity.MIN, CommentsQuantity.MAX))
    };
    photos.push(photo);
  }
  return photos;
};

const photosElement = document.querySelector(`.pictures`);
const photosTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);

// Функция создаст DOM-элементы, соответствующие фотографиям и заполняет их данными
const createPhotos = (photo) => {
  const photoElement = photosTemplate.cloneNode(true);

  photoElement.querySelector(`.picture__img`).src = photo.url;
  photoElement.querySelector(`.picture__likes`).textContent = photo.likes;
  photoElement.querySelector(`.picture__comments`).textContent = photo.comments.length;

  return photoElement;
};

// Функция отрисует сгенерированные DOM-элементы
const createPicturesList = (photos) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < photos.length; i++) {
    fragment.appendChild(createPhotos(photos[i]));
  }

  return fragment;
};

photosElement.appendChild(createPicturesList(createPhotoDescription(25)));
