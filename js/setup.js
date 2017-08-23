'use strict';

// -----> Константы <-----
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var WIZARD_LASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var ESC_KEYCODE = 27;

var ENTER_KEYCODE = 13;

var wizards = [];

var amountWizards = 4;

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');

var wizardCoatChange = document.querySelector('.wizard-coat');
var wizardEyesChange = document.querySelector('.wizard-eyes');
var fireballChange = document.querySelector('.setup-fireball-wrap');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// -----> Валидация форм <-----

var userNameInput = setup.querySelector('.setup-user-name');

userNameInput.addEventListener('invalid', function () {
  if (!userNameInput.validity.valid) {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    }
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
});

// -----> Рандомный цвет плаща по клику <-----
wizardCoatChange.addEventListener('click', function () {
  wizardCoatChange.style.fill = getRandomValue(COAT_COLORS);
});

// -----> Рандомный цвет глаз по клику <-----
wizardEyesChange.addEventListener('click', function () {
  wizardEyesChange.style.fill = getRandomValue(EYES_COLORS);
});

// -----> Рандомный цвет фаербола по клику <-----
fireballChange.addEventListener('click', function () {
  fireballChange.style.backgroundColor = getRandomValue(FIREBALL_COLORS);
});

var similarListElement = document.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

// -----> Получение рандомного индекса <-----
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};
// -----> Получение рандомного значения <-----
var getRandomValue = function (array) {
  return array[getRandomInt(0, array.length - 1)];
};
// -----> Создание мага <-----
var createWizard = function () {
  var wizard = {
    name: getRandomValue(WIZARD_NAMES) + ' ' + getRandomValue(WIZARD_LASTNAMES),
    coatColor: getRandomValue(COAT_COLORS),
    eyesColor: getRandomValue(EYES_COLORS)
  };
  return wizard;
};
// -----> Рендер мага <-----
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};
// -----> Создание массива магов <-----
var createWizards = function () {
  for (var i = 0; i < amountWizards; i++) {
    wizards[i] = createWizard();
  }
  return wizards;
};

var fragment = document.createDocumentFragment();
// -----> Добавление мага в DOM <-----
var pasteWizards = function () {
  for (var j = 0; j < createWizards().length; j++) {
    fragment.appendChild(renderWizard(wizards[j]));
  }
  return fragment;
};

similarListElement.appendChild(pasteWizards());

setup.querySelector('.setup-similar').classList.remove('hidden');
