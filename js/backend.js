'use strict';

(() => {
  const Url = {
    GET: `https://21.javascript.pages.academy/kekstagram/data`,
    POST: `https://21.javascript.pages.academy/kekstagram`
  };

  const StatusCode = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  };

  const TIMEOUT_IN_MS = 10000;

  const messageSuccessTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const messageErrorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
  const sectionMain = document.querySelector(`main`);

  const getResponseRequest = (xhr, onSuccess, onError) => {
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      let error;
      switch (xhr.status) {
        case StatusCode.SUCCESS:
          onSuccess(xhr.response);
          break;
        case StatusCode.BAD_REQUEST:
          error = `Неверный запрос`;
          break;
        case StatusCode.NOT_FOUND:
          error = `Ничего не найдено`;
          break;
        case StatusCode.SERVER_ERROR:
          error = `Ошибка сервера`;
          break;

        default:
          error = `Статус ответа: ${xhr.status} ${xhr.statusText}`;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ${xhr.TIMEOUT}мс`);
    });

    xhr.TIMEOUT = TIMEOUT_IN_MS;

    return xhr;
  };

  const load = (onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.open(`GET`, Url.GET);
    getResponseRequest(xhr, onSuccess, onError);
    xhr.send();
  };

  const send = function (data, onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.open(`POST`, Url.POST);
    getResponseRequest(xhr, onSuccess, onError);
    xhr.send(data);
  };

  const errorHandler = (errorMessage) => {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; padding: 20px; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  const renderMessage = (message, type) => {
    sectionMain.appendChild(message);

    const closeButtonMessage = sectionMain.querySelector(`.${type}__button`);

    const closeMessageModal = () => {
      sectionMain.removeChild(message);
      document.removeEventListener(`keydown`, onDocumentKeydown);
    };

    closeButtonMessage.addEventListener(`click`, closeMessageModal);
    document.addEventListener(`click`, closeMessageModal);

    const onDocumentKeydown = (evt) => {
      if (evt.key === `Escape`) {
        closeMessageModal();
      }
    };

    document.addEventListener(`keydown`, onDocumentKeydown);
  };

  const showMessageSuccess = () => {
    const messageSuccess = messageSuccessTemplate.cloneNode(true);
    messageSuccess.querySelector(`h2`).textContent = `Изображение успешно загружено`;
    messageSuccess.querySelector(`button`).textContent = `Круто!`;
    renderMessage(messageSuccess, `success`);
  };

  const showMessagError = () => {
    const messageError = messageErrorTemplate.cloneNode(true);
    messageError.querySelector(`h2`).textContent = `Ошибка загрузки файла`;
    messageError.querySelector(`button`).textContent = `Загрузить другой файл`;
    renderMessage(messageError, `error`);
  };

  window.backend = {
    load,
    send,
    errorHandler,
    showMessageSuccess,
    showMessagError
  };
})();
