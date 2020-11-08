'use strict';

(() => {
  const getRandomNumber = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

  const onModalOpenKeydown = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      window.form.closeEditFormImg();
      window.gallery.closeBigPhoto();
    }
  };

  window.utils = {
    getRandomNumber,
    onModalOpenKeydown
  };
})();
