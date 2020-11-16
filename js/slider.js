'use strict';

const EFFECT_VALUES = {
  chrome: {
    min: 0,
    max: 1,
    template: `grayscale({value})`
  },
  sepia: {
    min: 0,
    max: 1,
    template: `sepia({value})`
  },
  marvin: {
    min: 0,
    max: 100,
    template: `invert({value}%)`
  },
  phobos: {
    min: 0,
    max: 3,
    template: `blur({value}px)`
  },
  heat: {
    min: 1,
    max: 3,
    template: `brightness({value})`
  },
};

const effectBar = document.querySelector(`.effect-level`);
const effectLevelValue = effectBar.querySelector(`.effect-level__value`);
const effectLevelLine = effectBar.querySelector(`.effect-level__line`);
const effectLevelPin = effectBar.querySelector(`.effect-level__pin`);
const effectLevelDepth = effectBar.querySelector(`.effect-level__depth`);

const getEffectIntensity = (effectChecked) => {
  if (effectChecked.value !== `none`) {
    const min = EFFECT_VALUES[effectChecked.value].min;
    const max = EFFECT_VALUES[effectChecked.value].max;
    const template = EFFECT_VALUES[effectChecked.value].template;

    const result = min + ((max - min) / 100 * effectLevelValue.value);
    window.editor.previewImg.style = `filter: ` + template.replace(`{value}`, result);
  } else {
    window.editor.previewImg.style = null;
  }
};

const onSliderPinMouseDown = (evt) => {
  evt.preventDefault();

  let startCoordX = evt.clientX;

  const onSliderPinMouseMove = (moveEvt) => {
    moveEvt.preventDefault();
    const shiftX = startCoordX - moveEvt.clientX;
    startCoordX = moveEvt.clientX;

    const currentPositionPin = effectLevelPin.offsetLeft - shiftX;

    const widthEffectLevelLine = effectLevelLine.offsetWidth;

    if (!(currentPositionPin < 0 || currentPositionPin > widthEffectLevelLine)) {
      const newPositionPin = currentPositionPin * 100 / widthEffectLevelLine;
      effectLevelPin.style.left = `${currentPositionPin}px`;
      effectLevelValue.setAttribute(`value`, Math.round(newPositionPin));
      effectLevelDepth.style.width = `${Math.round(newPositionPin)}%`;

      const effectChecked = document.querySelector(`input[name=effect]:checked`);
      getEffectIntensity(effectChecked);
    }
  };

  const onSliderPinMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener(`mousemove`, onSliderPinMouseMove);
    document.removeEventListener(`mouseup`, onSliderPinMouseUp);
  };

  document.addEventListener(`mousemove`, onSliderPinMouseMove);
  document.addEventListener(`mouseup`, onSliderPinMouseUp);
};

window.slider = {
  effectLevelValue,
  effectLevelPin,
  effectLevelDepth,
  onSliderPinMouseDown
};
