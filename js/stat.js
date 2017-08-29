'use strict';

(function () {
  window.renderStatistics = function (ctx, names, times) {

    var drawRectangle = function (x1, y1, x2, y2, fill) {
      ctx.fillStyle = fill || '#000000';
      ctx.fillRect(x1, y1, x2, y2);
    };

    drawRectangle(110, 20, 420, 270, 'rgba(0, 0, 0, 0.7)');
    drawRectangle(100, 10, 420, 270, 'rgba(256, 256, 256, 1.0)');

    var drawText = function (fill, font, text, x1, y1) {
      ctx.font = font;
      ctx.fillStyle = fill || '#000000';
      ctx.fillText(text, x1, y1);
    };

    drawText('#000000', '16px PT Mono', 'Ура вы победили!', 220, 40);
    drawText('#000000', '16px PT Mono', 'Список результатов:', 210, 60);

    var barHeigth = 150;
    var histogramWidth = 40;
    var indent = 90;
    var initialX = 120;
    var initialY = 110;

    var maxTime = Math.max.apply(null, times);
    var step = barHeigth / maxTime;

    ctx.textBaseline = 'top';

    var randomColor = function () {
      return 'rgba(0, 0, 255,' + (Math.random() + 0.1).toFixed(1) + ')';
    };

    for (var i = 0; i < times.length; i++) {
      drawText('#000000', '16px PT Mono', times[i].toFixed(0), initialX + indent * i, initialY - 20);
      drawRectangle(initialX + indent * i, initialY + barHeigth - times[i] * step, histogramWidth, times[i] * step, (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : randomColor());
      drawText('#000000', '16px PT Mono', names[i], initialX + indent * i, initialY + barHeigth);
    }
  };
})();
