'use strict';

(function () {
  var wizards = [];

  var amountWizards = 4;

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');

  var wizardCoatChange = document.querySelector('.wizard-coat');
  var wizardEyesChange = document.querySelector('.wizard-eyes');
  var fireballChange = document.querySelector('.setup-fireball-wrap');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.myConst.ESC_KEYCODE) {
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
    if (evt.keyCode === window.myConst.ENTER_KEYCODE) {
      openPopup();
    }
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.myConst.ENTER_KEYCODE) {
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
    wizardCoatChange.style.fill = window.util.getRandomValue(window.myConst.COAT_COLORS);
  });

  // -----> Рандомный цвет глаз по клику <-----
  wizardEyesChange.addEventListener('click', function () {
    wizardEyesChange.style.fill = window.util.getRandomValue(window.myConst.EYES_COLORS);
  });

  // -----> Рандомный цвет фаербола по клику <-----
  fireballChange.addEventListener('click', function () {
    fireballChange.style.backgroundColor = window.util.getRandomValue(window.myConst.FIREBALL_COLORS);
  });

  var similarListElement = document.querySelector('.setup-similar-list');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

  // -----> Создание мага <-----
  var createWizard = function () {
    var wizard = {
      name: window.util.getRandomValue(window.myConst.WIZARD_NAMES) + ' ' + window.util.getRandomValue(window.myConst.WIZARD_LASTNAMES),
      coatColor: window.util.getRandomValue(window.myConst.COAT_COLORS),
      eyesColor: window.util.getRandomValue(window.myConst.EYES_COLORS)
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
})();
