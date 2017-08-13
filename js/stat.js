'use strict'

window.renderStatistics = function(ctx, names, times) {

  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.strokeRect(110, 20, 420, 270);
  ctx.fillRect(110, 20, 420, 270);

  ctx.fillStyle = 'rgba(256, 256, 256, 1.0)';
  ctx.strokeRect(100, 10, 420, 270);
  ctx.fillRect(100, 10, 420, 270);

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';

  ctx.fillText('Ура вы победили!', 220, 40);
  ctx.fillText('Список результатов:', 220, 60);

  var barHeigth = 150;
  var histogramWidth = 40;
  var indent = 90;
  var initialX = 120;
  var initialY = 110;

  var maxTime = Math.max.apply(null, times);
  var step = barHeigth / maxTime;

  ctx.textBaseline = 'top';

  for (var i = 0; i < times.length; i++) {
    ctx.fillText(times[i].toFixed(0), initialX + indent * i, initialY - 20);
    ctx.fillStyle = names[i] === 'Вы' ?
      'rgba(255, 0, 0, 1)' :
      'rgba(0, 0, 255,' + (Math.random() + 0.1).toFixed(1) + ')';
    ctx.fillRect(initialX + indent * i, initialY + barHeigth - times[i] * step, histogramWidth, times[i] * step);
    ctx.fillText(names[i], initialX + indent * i, initialY + barHeigth);
  };
};
