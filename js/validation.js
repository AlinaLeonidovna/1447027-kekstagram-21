'use strict';

const HashtagsParameters = {
  MIN_LENGTH: 2,
  MAX_LENGTH: 20,
  MAX_QUANTITY: 5,
  REGISTER: /^#[а-яА-Яa-zA-Z0-9]*$/
};

const hashtagsInput = window.editor.uploadFormImg.querySelector(`.text__hashtags`);
const commentInput = window.editor.uploadFormImg.querySelector(`.text__description`);

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
  document.removeEventListener(`keydown`, window.gallery.onModalOpenKeydown);
});

hashtagsInput.addEventListener(`blur`, () => {
  document.addEventListener(`keydown`, window.gallery.onModalOpenKeydown);
});

// Комментарий
commentInput.addEventListener(`focus`, () => {
  document.removeEventListener(`keydown`, window.gallery.onModalOpenKeydown);
});

commentInput.addEventListener(`blur`, () => {
  document.addEventListener(`keydown`, window.gallery.onModalOpenKeydown);
});

window.validation = {
  hashtagsInput,
  onHashtagsInput
};
