'use strict';

// -----> Константы <-----
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var WIZARD_LASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var wizards = [];

var amountWizards = 4;

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

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

userDialog.querySelector('.setup-similar').classList.remove('hidden');
