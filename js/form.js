'use strict';

const uploadInputImg = window.editor.uploadFormImg.querySelector(`#upload-file`);
const editFormImg = window.editor.uploadFormImg.querySelector(`.img-upload__overlay`);
const closeButtonImg = window.editor.uploadFormImg.querySelector(`#upload-cancel`);

const openEditFormImg = () => {
  editFormImg.classList.remove(`hidden`);
  document.addEventListener(`keydown`, window.utils.onModalOpenKeydown);
  document.querySelector(`body`).classList.add(`modal-open`);
  window.editor.currentScaleValue.value = `100%`;
  window.editor.scaleControlSmaller.addEventListener(`click`, window.editor.onScaleValuePressingButtonSmaller);
  window.editor.scaleControlBigger.addEventListener(`click`, window.editor.onScaleValuePressingButtonBigger);
  editFormImg.addEventListener(`change`, window.editor.onEditFormImgChange);
  window.editor.effectBar.classList.add(`hidden`);
  window.validation.hashtagsInput.addEventListener(`input`, window.validation.onHashtagsInput);
  window.validation.commentInput.addEventListener(`input`, window.validation.onCommentInput);
  closeButtonImg.addEventListener(`click`, closeEditFormImg);
  window.editor.effectLevelPin.addEventListener(`mousedown`, window.slider.onSliderPinMouseDown);
  window.editor.uploadFormImg.addEventListener(`submit`, onUploadFormImgSubmit);
};

const closeEditFormImg = () => {
  editFormImg.classList.add(`hidden`);
  document.removeEventListener(`keydown`, window.utils.onModalOpenKeydown);
  uploadInputImg.value = ``;
  window.validation.hashtagsInput.value = ``;
  window.editor.previewImg.className = ``;
  window.editor.previewImg.style.transform = ``;
  window.editor.scaleControlSmaller.removeEventListener(`click`, window.editor.onScaleValuePressingButtonSmaller);
  window.editor.scaleControlBigger.removeEventListener(`click`, window.editor.onScaleValuePressingButtonBigger);
  editFormImg.removeEventListener(`change`, window.editor.onEditFormImgChange);
  window.validation.hashtagsInput.removeEventListener(`input`, window.validation.onHashtagsInput);
  window.validation.commentInput.removeEventListener(`input`, window.validation.onCommentInput);
  document.querySelector(`body`).classList.remove(`modal-open`);
  closeButtonImg.removeEventListener(`click`, closeEditFormImg);
  window.editor.effectLevelPin.removeEventListener(`mousedown`, window.slider.onSliderPinMouseDown);
  window.editor.uploadFormImg.removeEventListener(`submit`, onUploadFormImgSubmit);
  window.editor.uploadFormImg.reset();
};

uploadInputImg.addEventListener(`change`, (evt) => {
  evt.preventDefault();
  openEditFormImg();
  window.uploadFile.onfileUpload();
});

const onUploadFormImgSubmit = (evt) => {
  evt.preventDefault();
  window.backend.send(new FormData(window.editor.uploadFormImg), window.backend.showMessageSuccess, window.backend.showMessagError);
  closeEditFormImg();
};

window.form = closeEditFormImg;
