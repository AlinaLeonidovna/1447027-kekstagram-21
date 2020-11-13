'use strict';

const DEBOUNCE_INTERVAL_IN_MS = 500;

const debounce = (cb) => {
  let lastTimeout = null;

  return (...parameters) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...parameters);
    }, DEBOUNCE_INTERVAL_IN_MS);
  };
};

window.debounce = {
  debounce
};

