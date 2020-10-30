'use strict';

(() => {
  const uploadInputImg = window.editor.uploadFormImg.querySelector(`#upload-file`);
  const editFormImg = window.editor.uploadFormImg.querySelector(`.img-upload__overlay`);
  const closeButtonImg = window.editor.uploadFormImg.querySelector(`#upload-cancel`);

  // Загрузка изображения и показ формы редактирования

  const openEditFormImg = () => {
    editFormImg.classList.remove(`hidden`);
    document.addEventListener(`keydown`, window.utils.onModalOpenKeydown);
    document.querySelector(`body`).classList.add(`modal-open`);
    window.editor.scaleControlSmaller.addEventListener(`click`, window.editor.onScaleValuePressingButtonSmaller);
    window.editor.scaleControlBigger.addEventListener(`click`, window.editor.onScaleValuePressingButtonBigger);
    editFormImg.addEventListener(`change`, window.editor.onEditFormImgChange);
    window.editor.effectBar.classList.add(`hidden`);
    window.editor.effectLevelPin.addEventListener(`mousedown`, window.editor.onLevelPinMousedown);
    window.validation.hashtagsInput.addEventListener(`input`, window.validation.onHashtagsInput);
    closeButtonImg.addEventListener(`click`, closeEditFormImg);
    window.editor.effectLevelPin.addEventListener(`mousedown`, window.filter.onMouseDown);
  };

  const closeEditFormImg = () => {
    editFormImg.classList.add(`hidden`);
    document.removeEventListener(`keydown`, window.utils.onModalOpenKeydown);
    uploadInputImg.value = ``;
    window.editor.previewImg.style.transform = ``;
    window.editor.currentScaleValue.value = 0 + `%`;
    window.editor.previewImg.style.filter = ``;
    window.validation.hashtagsInput.value = ``;
    window.editor.scaleControlSmaller.removeEventListener(`click`, window.editor.onScaleValuePressingButtonSmaller);
    window.editor.scaleControlBigger.removeEventListener(`click`, window.editor.onScaleValuePressingButtonBigger);
    editFormImg.removeEventListener(`change`, window.editor.onEditFormImgChange);
    window.editor.effectLevelPin.removeEventListener(`mousedown`, window.editor.onLevelPinMousedown);
    window.validation.hashtagsInput.removeEventListener(`input`, window.validation.onHashtagsInput);
    document.querySelector(`body`).classList.remove(`modal-open`);
    closeButtonImg.removeEventListener(`click`, closeEditFormImg);
    window.editor.effectLevelPin.removeEventListener(`mousedown`, window.filter.onMouseDown);
  };

  uploadInputImg.addEventListener(`change`, (evt) => {
    evt.preventDefault();
    openEditFormImg();
  });

  window.form = {
    closeEditFormImg
  };

})();
