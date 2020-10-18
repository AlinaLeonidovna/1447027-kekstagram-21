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

const Scale = {
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

const Hashtags = {
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
  bigPhotoElement.classList.remove(`hidden`);

  bigPhotoElement.querySelector(`.big-picture__img`).querySelector(`img`).src = photos.url;
  bigPhotoElement.querySelector(`.likes-count`).textContent = photos.likes;
  bigPhotoElement.querySelector(`.social__caption`).textContent = photos.description;
  bigPhotoElement.querySelector(`.comments-count`).textContent = photos.comments.length;

  bigPhotoElement.querySelector(`.social__comment-count`).classList.add(`hidden`);
  bigPhotoElement.querySelector(`.comments-loader`).classList.add(`hidden`);

  createCommentsList(photos.comments);
};

// отрисует большую фотографию
renderBigPhotoElement(createPhotoDescription(25)[0]);

// Добавляет класс, чтобы контейнер с фотографиями позади не прокручивался при скролле
document.querySelector(`body`).classList.add(`modal-open`);

bigPhotoElement.classList.add(`hidden`);

// Находим поле для загрузки нового изображения на сайт
const uploadFormImg = document.querySelector(`.img-upload__form`);
// Находим стандартный контрол загрузки файла
const uploadInputImg = uploadFormImg.querySelector(`#upload-file`);
// Находим форму редактирования изображения
const editFormImg = uploadFormImg.querySelector(`.img-upload__overlay`);
// Находим кнопку для закрытия формы редактирования изображения
const closeButtonImg = uploadFormImg.querySelector(`#upload-cancel`);
// Находим превью изображения
const previewImg = uploadFormImg.querySelector(`.img-upload__preview`).querySelector(`img`);
const scaleControls = uploadFormImg.querySelector(`.scale`);
// Находим кнопку уменьшения масштаба
const scaleControlSmaller = scaleControls.querySelector(`.scale__control--smaller`);
const currentScaleValue = scaleControls.querySelector(`.scale__control--value`);
// Находим кнопку увеличения масштаба
const scaleControlBigger = scaleControls.querySelector(`.scale__control--bigger`);
// Находим поле для ввода хэш-тегов
const hashtagsInput = uploadFormImg.querySelector(`.text__hashtags`);
const effectBar = uploadFormImg.querySelector(`.effect-level`);
// Находим ползунок в слайдере
const effectLevelPin = effectBar.querySelector(`.effect-level__pin`);
// Находим все радиокнопки с эффектами
const effectsRadio = document.querySelectorAll(`.effects__radio`);
const effectLevelValue = document.querySelector(`.effect-level__value`);

// Загрузка изображения и показ формы редактирования

// Обработчик закрывает форму редактирования изображения после нажатия по клавише Esc
const onEditFormKeydownEsc = (evt) => {
  if (evt.keyCode === 27) {
    // Отменяем действия по умолчанию
    evt.preventDefault();
    // Добавляем класс hidden, чтобы скрыть форму
    editFormImg.classList.add(`hidden`);
    // Удаляем класс modal-open
    document.querySelector(`body`).classList.remove(`modal-open`);
  }
};

// Функция открывает форму редактирования изображения
const openEditFormImg = () => {
  // Удаляем класс hidden, который скрывал форму
  editFormImg.classList.remove(`hidden`);
  // Слушатель события на загрузку изображения
  document.addEventListener(`keydown`, onEditFormKeydownEsc);
  // Добавляет класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле
  document.querySelector(`body`).classList.add(`modal-open`);
  // Сушатель события на уменьшение масштаба
  scaleControlSmaller.addEventListener(`click`, onScaleValuePressingButtonSmaller);
  // Сушатель события на увеличение масштаба
  scaleControlBigger.addEventListener(`click`, onScaleValuePressingButtonBigger);
  // Сушатель события на изменения значений формы редактирования изображения (делегирование)
  editFormImg.addEventListener(`change`, onEditFormImgChange);
  // По умолчанию должен быть выбран эффект «Оригинал». При выборе эффекта «Оригинал» слайдер скрывается.
  effectBar.classList.add(`hidden`);
  // Ловим событие mousedown на ползунке слайдера
  effectLevelPin.addEventListener(`mousedown`, onLevelPinMousedown);
  // Слушатель события на ввод хеш-тегов
  hashtagsInput.addEventListener(`input`, onHashtagsInput);
};

// Функция закрывает форму редактирования изображения
const closeEditFormImg = () => {
  editFormImg.classList.add(`hidden`);
  document.removeEventListener(`keydown`, onEditFormKeydownEsc);
  // сброс значения поля выбора файла
  uploadInputImg.value = ``;
  // сброс до первоначального размера изображения
  previewImg.style.transform = ``;
  // При переключении эффектов, уровень насыщенности сбрасывается до начального значения (100%):
  // слайдер, CSS-стиль изображения и значение поля должны обновляться.
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

// Ловим событие change на контроле загрузки файла и в случае изменения значения поля
// (выбора изображения), функция, переданная в обработчик откроет форму редактирования изображения
uploadInputImg.addEventListener(`change`, (evt) => {
  // Отменяем действия по умолчанию
  evt.preventDefault();
  openEditFormImg();
});

// Ловим событие click на кнопке для закрытия формы редактирования изображения и функция,
// переданная в обработчик закроет форму редактирования изображения
closeButtonImg.addEventListener(`click`, (evt) => {
  // Отменяем действия по умолчанию
  evt.preventDefault();
  closeEditFormImg();
});

// Масштаб

// Функция вернет текщее значение масштаба в виде целого числа
const getСurrentScaleValue = () => {
  return parseInt(currentScaleValue.value, 10);
};

const getScaleRange = (value) => {
  return Math.min(Scale.MAX_VALUE, Math.max(Scale.MIN_VALUE, value));
};

// Функция поменяет старое значение на новое в соответствии с нажатой кнопкой
const calculateScale = (newValue) => {
  // Новое значение шкалы
  const newScaleValue = getScaleRange(newValue);
  // Поменяет текущее значение на новое в %
  currentScaleValue.value = `${newScaleValue}%`;
  // Изображению добавится стиль CSS, который с помощью трансформации задаст масштаб
  previewImg.style.transform = `scale(${newScaleValue / 100})`;
};

// Обработчик события при нажатие на "-"
const onScaleValuePressingButtonSmaller = () => {
  calculateScale(getСurrentScaleValue() - Scale.STEP);
};

// Обработчик события при нажатие на "+"
const onScaleValuePressingButtonBigger = () => {
  calculateScale(getСurrentScaleValue() + Scale.STEP);
};

// Наложение эффекта на изображение

const onEditFormImgChange = (evt) => {
  // при каждом изменении значения формы редактирования изображения
  // если это клик по радиобаттону
  if (evt.target.matches(`input[type="radio"]`)) {
    // при изменении уровня интенсивности эффекта, CSS-стили картинки внутри .img-upload__preview обновляются
    previewImg.style.filter = ``;
    // если значение соответствует none
    if (evt.target.matches(`input[value="none"]`)) {
      // значит выбран эффект "Оригинал" и слайдер скрывается
      effectBar.classList.add(`hidden`);
    } else {
      // иначе слайдер показывается
      effectBar.classList.remove(`hidden`);
    }
  }
};

// Удалит предыдущий эффект, перед добавлением нового
const removeEffect = () => {
  const effects = Array.from(previewImg.classList);
  effects.forEach((effect) => {
    if (effect.match(`effects__preview--`)) {
      previewImg.classList.remove(effect);
    }
  });
};

// Функция применяет нужный фильтр к превью
const applyEffect = (effectChecked) => {
  removeEffect();
  // добавит превью класс соответствующий новому выбранному эффекту
  previewImg.classList.add(effectChecked);
};

// Сравниваем эффекты на соответствие по id и вызываем функцию, которая применит нужный фильтр, добавив нужный класс к превью
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

// Перебираем все эффекты
effectsRadio.forEach((effectRadio) => {
  // функция вернет эффект, на котором было поймано событие click и добавит обработчик
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

// Функция проверяет на совпадение хэш-тегов
const checkDuplicateHashtags = (hashtagsArray, hashtag) => {
  const index = hashtagsArray.indexOf(hashtag) + 1;
  return hashtagsArray.indexOf(hashtag, index);
};

// Функция переберет массив, проверит каждый хэш-тег на соответствие ограничениям и выведет сообщение об ошибке
const getResultValidation = (hashtagsArray) => {
  for (let hashtag of hashtagsArray) {
    if (hashtag[0] !== `#`) {
      hashtagsInput.setCustomValidity(`Хэш-тег начинается с символа # (решётка)`);
    } else if (hashtag.length < Hashtags.MIN_LENGTH) {
      hashtagsInput.setCustomValidity(`Хэш-тег не может состоять только из одной решётки. Ещё минимум ${Hashtags.MIN_LENGTH - hashtag.length} симв.`);
    } else if (!Hashtags.REGISTER.test(hashtag)) {
      hashtagsInput.setCustomValidity(`Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.`);
    } else if (hashtag.length > Hashtags.MAX_LENGTH) {
      hashtagsInput.setCustomValidity(`Максимальная длина одного хэш-тега ${Hashtags.MAX_LENGTH} символов, включая решётку. Удалите лишние ${hashtag.length - Hashtags.MAX_LENGTH} симв.`);
    } else if (checkDuplicateHashtags(hashtagsArray, hashtag) !== -1) {
      hashtagsInput.setCustomValidity(`Один и тот же хэш-тег не может быть использован дважды`);
    } else {
      hashtagsInput.setCustomValidity(``);
    }
    // Проверка валидности поля на каждый ввод символа
    hashtagsInput.reportValidity();
  }

  if (hashtagsArray.length > Hashtags.MAX_QUANTITY) {
    hashtagsInput.setCustomValidity(`Нельзя указать больше ${Hashtags.MAX_QUANTITY} хэш-тегов`);
  }
};

// Обработчик событий
const onHashtagsInput = (evt) => {
  // Переводим коллекцию в нижний регистр для поиска одинаковых хэш-тегов и разбиваем на массив по разделителю пробел
  const hashtagsArray = evt.target.value.toLowerCase().split(` `);
  // Вызываем функцию для проверки на соответствие ограничениям
  getResultValidation(hashtagsArray);
};

// Запрет закрытия формы редактирования изображения при фокусе на поле для ввода хэш-тегов
hashtagsInput.addEventListener(`focus`, () => {
  document.removeEventListener(`keydown`, onEditFormKeydownEsc);
});

// Добавление закрытия формы редактирования изображения при отсутствии фокуса на поле для ввода хэш-тегов
hashtagsInput.addEventListener(`blur`, () => {
  document.addEventListener(`keydown`, onEditFormKeydownEsc);
});
