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

const ScaleParameters = {
  MIN_VALUE: 25,
  MAX_VALUE: 100,
  STEP: 25
};

const EFFECT_VALUES = {
  chrome: {
    min: 0,
    max: 1,
    template: `grayscale({value})`
  },
  sepia: {
    min: 0,
    max: 1,
    template: `sepia({value})`
  },
  marvin: {
    min: 0,
    max: 100,
    template: `invert({value}%)`
  },
  phobos: {
    min: 0,
    max: 3,
    template: `blur({value}px)`
  },
  heat: {
    min: 1,
    max: 3,
    template: `brightness({value})`
  },
};

const HashtagsParameters = {
  MIN_LENGTH: 2,
  MAX_LENGTH: 20,
  MAX_QUANTITY: 5,
  REGISTER: /^#[а-яА-Яa-zA-Z0-9]*$/
};

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

// Функция отрисует сгенерированные DOM-элементы (25 фото)
const createPicturesList = (photos) => {
  // инициализируем новый фрагмент
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < photos.length; i++) {
    fragment.appendChild(createPhotos(photos[i]));
  }
  // возвращает все сгенерированные DOM-элементы
  return fragment;
};
// отрисует все сгенерированные DOM-элементы
photosElement.appendChild(createPicturesList(createPhotoDescription(25)));

const commentsList = document.querySelector(`.social__comments`);
const commentsItem = commentsList.querySelector(`.social__comment`);
const bigPhotoElement = document.querySelector(`.big-picture`);

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

renderBigPhotoElement(createPhotoDescription(25)[0]);

const uploadFormImg = document.querySelector(`.img-upload__form`);
const uploadInputImg = uploadFormImg.querySelector(`#upload-file`);
const editFormImg = uploadFormImg.querySelector(`.img-upload__overlay`);
const closeButtonImg = uploadFormImg.querySelector(`#upload-cancel`);
const previewImg = uploadFormImg.querySelector(`.img-upload__preview`).querySelector(`img`);
const scaleControls = uploadFormImg.querySelector(`.scale`);
const scaleControlSmaller = scaleControls.querySelector(`.scale__control--smaller`);
const currentScaleValue = scaleControls.querySelector(`.scale__control--value`);
const scaleControlBigger = scaleControls.querySelector(`.scale__control--bigger`);
const hashtagsInput = uploadFormImg.querySelector(`.text__hashtags`);
const commentInput = uploadFormImg.querySelector(`.text__description`);
const effectBar = uploadFormImg.querySelector(`.effect-level`);
const effectLevelPin = effectBar.querySelector(`.effect-level__pin`);
const effectsRadio = document.querySelectorAll(`.effects__radio`);
const effectLevelValue = document.querySelector(`.effect-level__value`);
const closeButtonBigImg = bigPhotoElement.querySelector(`#picture-cancel`);

// Просмотр любого изображения в полноэкранном режиме

const onModalOpenKeydown = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closeEditFormImg();
    closeBigPhotoElement();
  }
};

const openBigPhotoElement = () => {
  bigPhotoElement.classList.remove(`hidden`);
  closeButtonBigImg.addEventListener(`click`, onModalOpenKeydown);
  document.addEventListener(`keydown`, onModalOpenKeydown);
  document.querySelector(`body`).classList.add(`modal-open`);
};

const closeBigPhotoElement = () => {
  bigPhotoElement.classList.add(`hidden`);
  closeButtonBigImg.removeEventListener(`click`, onModalOpenKeydown);
  document.removeEventListener(`keydown`, onModalOpenKeydown);
  document.querySelector(`body`).classList.remove(`modal-open`);
};

const onPhotoElementClick = (evt) => {
  if (evt.target && evt.target.matches(`img[class="picture__img"]`)) {
    bigPhotoElement.querySelector(`.big-picture__img img`).src = evt.target.src;

    openBigPhotoElement();
  }
};

photosElement.addEventListener(`click`, onPhotoElementClick);

// НЕ РАБОТАЕТ
const onPhotoElementKeydown = (evt) => {
  if (evt.key === `Enter`) {
    for (let i = 0; i < photosTemplate.length; i++) {
      let photo = photosTemplate[i];
      if (photo === document.activeElement) {
        bigPhotoElement.querySelector(`.big-picture__img img`).src = photo.querySelector(`.big-picture__img img`).src;

        openBigPhotoElement();
      }
    }
  }
};

photosElement.addEventListener(`keydown`, onPhotoElementKeydown);

// Загрузка изображения и показ формы редактирования

const openEditFormImg = () => {
  editFormImg.classList.remove(`hidden`);
  document.addEventListener(`keydown`, onModalOpenKeydown);
  document.querySelector(`body`).classList.add(`modal-open`);
  scaleControlSmaller.addEventListener(`click`, onScaleValuePressingButtonSmaller);
  scaleControlBigger.addEventListener(`click`, onScaleValuePressingButtonBigger);
  editFormImg.addEventListener(`change`, onEditFormImgChange);
  effectBar.classList.add(`hidden`);
  effectLevelPin.addEventListener(`mousedown`, onLevelPinMousedown);
  hashtagsInput.addEventListener(`input`, onHashtagsInput);
};

const closeEditFormImg = () => {
  editFormImg.classList.add(`hidden`);
  document.removeEventListener(`keydown`, onModalOpenKeydown);
  uploadInputImg.value = ``;
  previewImg.style.transform = ``;
  currentScaleValue.value = 100 + `%`;
  previewImg.style.filter = ``;
  hashtagsInput.value = ``;
  scaleControlSmaller.removeEventListener(`click`, onScaleValuePressingButtonSmaller);
  scaleControlBigger.removeEventListener(`click`, onScaleValuePressingButtonBigger);
  editFormImg.removeEventListener(`change`, onEditFormImgChange);
  effectLevelPin.removeEventListener(`mousedown`, onLevelPinMousedown);
  hashtagsInput.removeEventListener(`input`, onHashtagsInput);
  document.querySelector(`body`).classList.remove(`modal-open`);
};

uploadInputImg.addEventListener(`change`, (evt) => {
  evt.preventDefault();
  openEditFormImg();
});

closeButtonImg.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  closeEditFormImg();
});

// Масштаб

const getСurrentScaleValue = () => {
  return parseInt(currentScaleValue.value, 10);
};

const getScaleRange = (value) => {
  return Math.min(ScaleParameters.MAX_VALUE, Math.max(ScaleParameters.MIN_VALUE, value));
};

const calculateScale = (newValue) => {
  const newScaleValue = getScaleRange(newValue);
  currentScaleValue.value = `${newScaleValue}%`;
  previewImg.style.transform = `scale(${newScaleValue / 100})`;
};

const onScaleValuePressingButtonSmaller = () => {
  calculateScale(getСurrentScaleValue() - ScaleParameters.STEP);
};

const onScaleValuePressingButtonBigger = () => {
  calculateScale(getСurrentScaleValue() + ScaleParameters.STEP);
};

// Наложение эффекта на изображение

const onEditFormImgChange = (evt) => {
  if (evt.target.matches(`input[type="radio"]`)) {
    previewImg.style.filter = ``;
    if (evt.target.matches(`input[value="none"]`)) {
      effectBar.classList.add(`hidden`);
    } else {
      effectBar.classList.remove(`hidden`);
    }
  }
};

const removeEffect = () => {
  const effects = Array.from(previewImg.classList);
  effects.forEach((effect) => {
    if (effect.match(`effects__preview--`)) {
      previewImg.classList.remove(effect);
    }
  });
};

const applyEffect = (effectChecked) => {
  removeEffect();
  previewImg.classList.add(effectChecked);
};

const onEffectRadioClick = (evt) => {
  switch (evt.target.id) {
    case `effect-none`:
      applyEffect(`effects__preview--none`);
      break;
    case `effect-chrome`:
      applyEffect(`effects__preview--chrome`);
      break;
    case `effect-sepia`:
      applyEffect(`effects__preview--sepia`);
      break;
    case `effect-marvin`:
      applyEffect(`effects__preview--marvin`);
      break;
    case `effect-phobos`:
      applyEffect(`effects__preview--phobos`);
      break;
    case `effect-heat`:
      applyEffect(`effects__preview--heat`);
      break;
  }
};

effectsRadio.forEach((effectRadio) => {
  effectRadio.addEventListener(`click`, onEffectRadioClick);
});

// Изменение глубины эффекта, накладываемого на изображение

const getEffectIntensity = (effectChecked) => {
  if (effectChecked.value !== `none`) {
    const min = EFFECT_VALUES[effectChecked.value].min;
    const max = EFFECT_VALUES[effectChecked.value].max;
    const template = EFFECT_VALUES[effectChecked.value].template;

    const result = min + ((max - min) / 100 * effectLevelValue.value);
    previewImg.style = `filter: ` + template.replace(`{value}`, result);
  } else {
    previewImg.style = null;
  }
};

const onLevelPinMousedown = (evt) => {
  evt.preventDefault();
  const effectChecked = document.querySelector(`input[name=effect]:checked`);
  getEffectIntensity(effectChecked);
};

// Хэш-теги

const checkDuplicateHashtags = (hashtagsArray, hashtag) => {
  const index = hashtagsArray.indexOf(hashtag) + 1;
  return hashtagsArray.indexOf(hashtag, index);
};

const getResultValidation = (hashtagsArray) => {
  for (let hashtag of hashtagsArray) {
    if (hashtag[0] !== `#`) {
      hashtagsInput.setCustomValidity(`Хэш-тег начинается с символа # (решётка)`);
    } else if (hashtag.length < HashtagsParameters.MIN_LENGTH) {
      hashtagsInput.setCustomValidity(`Хэш-тег не может состоять только из одной решётки. Ещё минимум ${HashtagsParameters.MIN_LENGTH - hashtag.length} симв.`);
    } else if (!HashtagsParameters.REGISTER.test(hashtag)) {
      hashtagsInput.setCustomValidity(`Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.`);
    } else if (hashtag.length > HashtagsParameters.MAX_LENGTH) {
      hashtagsInput.setCustomValidity(`Максимальная длина одного хэш-тега ${HashtagsParameters.MAX_LENGTH} символов, включая решётку. Удалите лишние ${hashtag.length - HashtagsParameters.MAX_LENGTH} симв.`);
    } else if (checkDuplicateHashtags(hashtagsArray, hashtag) !== -1) {
      hashtagsInput.setCustomValidity(`Один и тот же хэш-тег не может быть использован дважды`);
    } else {
      hashtagsInput.setCustomValidity(``);
    }

    hashtagsInput.reportValidity();
  }

  if (hashtagsArray.length > HashtagsParameters.MAX_QUANTITY) {
    hashtagsInput.setCustomValidity(`Нельзя указать больше ${HashtagsParameters.MAX_QUANTITY} хэш-тегов`);
  }
};

const onHashtagsInput = (evt) => {
  const hashtagsArray = evt.target.value.toLowerCase().split(` `);
  getResultValidation(hashtagsArray);
};

hashtagsInput.addEventListener(`focus`, () => {
  document.removeEventListener(`keydown`, onModalOpenKeydown);
});

hashtagsInput.addEventListener(`blur`, () => {
  document.addEventListener(`keydown`, onModalOpenKeydown);
});

// Комментарий

commentInput.addEventListener(`focus`, () => {
  document.removeEventListener(`keydown`, onModalOpenKeydown);
});

commentInput.addEventListener(`blur`, () => {
  document.addEventListener(`keydown`, onModalOpenKeydown);
});
