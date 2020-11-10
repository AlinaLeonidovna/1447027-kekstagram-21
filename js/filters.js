'use strict';

(() => {
  const filtersImg = document.querySelector(`.img-filters`);
  const MAX_UNIQUE_PHOTOS = 10;

  const changeActiveFilters = (button) => {
    filtersImg.querySelector(`.img-filters__button--active`).classList.remove(`img-filters__button--active`);
    button.classList.add(`img-filters__button--active`);
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

  const photosFilter = {
    'filter-default': (photos) => photos.slice(),
    'filter-random': (photos) => shufflePhotos(photos.slice().splice(0, MAX_UNIQUE_PHOTOS)),
    'filter-discussed': (photos) => photos.slice().sort((first, second) => second.comments.length - first.comments.length)
  };

  const onFiltersImgClick = window.debounce.debounce((evt) => {
    changeActiveFilters(evt.target);

    const filter = photosFilter[evt.target.id];
    const filtered = filter(window.gallery.getPictures());

    window.gallery.renderPhotos(filtered);
  });

  filtersImg.classList.remove(`img-filters--inactive`);
  filtersImg.addEventListener(`click`, onFiltersImgClick);
})();
