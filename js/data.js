'use strict';

(() => {
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

  // Функция создает список комментариев
  const createComments = (quantity) => {
    const comments = [];
    for (let i = 0; i < quantity; i++) {
      const comment = {
        avatar: `img/avatar-${window.utils.getRandomNumber(AvatarsNumber.MIN, AvatarsNumber.MAX)}.svg`,
        message: MESSAGES[window.utils.getRandomNumber(0, MESSAGES.length - 1)],
        name: NAMES[window.utils.getRandomNumber(0, NAMES.length - 1)]
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
        url: `photos/${window.utils.getRandomNumber(1, 25)}.jpg`,
        description: `описание фотографии`,
        likes: window.utils.getRandomNumber(Likes.MIN, Likes.MAX),
        comments: createComments(window.utils.getRandomNumber(CommentsQuantity.MIN, CommentsQuantity.MAX))
      };
      photos.push(photo);
    }
    return photos;
  };

  window.data = {
    createPhotoDescription
  };
})();
