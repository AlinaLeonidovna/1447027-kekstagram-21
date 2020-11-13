'use strict';

const ScaleParameters = {
  MIN_VALUE: 25,
  MAX_VALUE: 100,
  STEP: 25
};

const EFFECT_DEFAULT_VALUE = `100%`;

const uploadFormImg = document.querySelector(`.img-upload__form`);
const previewImg = uploadFormImg.querySelector(`.img-upload__preview`).querySelector(`img`);
const scaleControls = uploadFormImg.querySelector(`.scale`);
const scaleControlSmaller = scaleControls.querySelector(`.scale__control--smaller`);
const currentScaleValue = scaleControls.querySelector(`.scale__control--value`);
const scaleControlBigger = scaleControls.querySelector(`.scale__control--bigger`);
const effectBar = uploadFormImg.querySelector(`.effect-level`);
const effectLevelPin = effectBar.querySelector(`.effect-level__pin`);
const effectsRadio = document.querySelectorAll(`.effects__radio`);

// Масштаб
const getСurrentScaleValue = () => {
  return parseInt(currentScaleValue.value, 10);
};

const getScaleRange = (value) => {
  return Math.min(ScaleParameters.MAX_VALUE, Math.max(ScaleParameters.MIN_VALUE, value));
};

const calculateScale = (newValue) => {
  const newScaleValue = getScaleRange(newValue);
  currentScaleValue.value = `${newScaleValue}%`;
  previewImg.style.transform = `scale(${newScaleValue / 100})`;
};

const onScaleValuePressingButtonSmaller = () => {
  calculateScale(getСurrentScaleValue() - ScaleParameters.STEP);
};

const onScaleValuePressingButtonBigger = () => {
  calculateScale(getСurrentScaleValue() + ScaleParameters.STEP);
};

// Наложение эффекта на изображение
const onEditFormImgChange = (evt) => {
  if (evt.target.matches(`input[type="radio"]`)) {
    previewImg.style.filter = ``;
    if (evt.target.matches(`input[value="none"]`)) {
      effectBar.classList.add(`hidden`);
    } else {
      effectBar.classList.remove(`hidden`);
      window.slider.effectLevelPin.style.left = EFFECT_DEFAULT_VALUE;
      window.slider.effectLevelDepth.style.width = EFFECT_DEFAULT_VALUE;
    }
  }
};

const removeEffect = () => {
  const effects = Array.from(previewImg.classList);
  effects.forEach((effect) => {
    if (effect.match(`effects__preview--`)) {
      previewImg.classList.remove(effect);
    }
  });
};

const applyEffect = (effectChecked) => {
  removeEffect();
  previewImg.classList.add(effectChecked);
};

const onEffectRadioClick = (evt) => {
  switch (evt.target.id) {
    case `effect-none`:
      applyEffect(`effects__preview--none`);
      break;
    case `effect-chrome`:
      applyEffect(`effects__preview--chrome`);
      break;
    case `effect-sepia`:
      applyEffect(`effects__preview--sepia`);
      break;
    case `effect-marvin`:
      applyEffect(`effects__preview--marvin`);
      break;
    case `effect-phobos`:
      applyEffect(`effects__preview--phobos`);
      break;
    case `effect-heat`:
      applyEffect(`effects__preview--heat`);
      break;
  }
};

effectsRadio.forEach((effectRadio) => {
  effectRadio.addEventListener(`click`, onEffectRadioClick);
});

window.editor = {
  uploadFormImg,
  previewImg,
  scaleControlSmaller,
  currentScaleValue,
  scaleControlBigger,
  effectBar,
  effectLevelPin,
  onScaleValuePressingButtonSmaller,
  onScaleValuePressingButtonBigger,
  onEditFormImgChange
};
