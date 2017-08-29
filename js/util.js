'use strict';

window.util = (function () {
  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  return {
    getRandomValue: function (array) {
      return array[getRandomInt(0, array.length - 1)];
    }
  };
})();
