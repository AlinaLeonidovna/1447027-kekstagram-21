'use strict';

(() => {
  // Функция возвращает случайное число включая min и max
  const getRandomNumber = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

  const onModalOpenKeydown = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      window.form.closeEditFormImg();
      window.gallery.closeBigPhotoElement();
    }
  };

  window.utils = {
    getRandomNumber,
    onModalOpenKeydown
  };
})();
