'use strict';

(() => {
  const filtersImg = document.querySelector(`.img-filters`);
  const currentPicturesList = document.querySelectorAll(`.picture`);

  filtersImg.classList.remove(`img-filters--inactive`);

  const changeActiveFilters = (button) => {
    filtersImg.querySelector(`.img-filters__button--active`).classList.remove(`img-filters__button--active`);
    button.classList.add(`img-filters__button--active`);
  };

  const removePicturesList = () => {
    currentPicturesList.forEach((photo) => {
      photo.remove();
    });
  };

  const shufflePhotos = (photos) => {
    for (let i = photos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const element = photos[j];
      photos[j] = photos[i];
      photos[i] = element;
    }
    return photos;
  };

  const createDefaultFilter = () => window.gallery.currentPicturesList;

  const createRandomFilter = () => {
    return shufflePhotos(window.gallery.currentPicturesList.slice().splice(0, 10));
  };

  const createDiscussedFilter = () => {
    return window.gallery.currentPicturesList.slice().sort((first, second) => second.comments.length - first.comments.length
    );
  };

  const onFiltersImgClick = window.debounce.debounce((evt) => {
    changeActiveFilters(evt.target);
    removePicturesList();

    let filteredPhotos = [];
    switch (evt.target.id) {
      case `filter-default`:
        filteredPhotos = createDefaultFilter();
        break;
      case `filter-random`:
        filteredPhotos = createRandomFilter();
        break;
      case `filter-discussed`:
        filteredPhotos = createDiscussedFilter();
        break;

      default:
        filteredPhotos = createDefaultFilter();
    }

    window.gallery.createPicturesList(filteredPhotos);
  });

  filtersImg.addEventListener(`click`, onFiltersImgClick);
})();
