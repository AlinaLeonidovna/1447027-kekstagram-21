'use strict';

(() => {
  const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

  const uploadInputImg = document.querySelector(`#upload-file[type=file]`);
  const previewImg = document.querySelector(`.img-upload__preview`).querySelector(`img`);
  const previewEffects = document.querySelectorAll(`.effects__preview`);

  const onfileUpload = () => {
    const file = uploadInputImg.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener(`load`, () => {
        previewImg.src = reader.result;

        previewEffects.forEach((elem) => {
          elem.style.backgroundImage = `url("${reader.result}")`;
        });
      });

      reader.readAsDataURL(file);
    }
  };

  window.uploadFile = {
    onfileUpload
  };
})();
