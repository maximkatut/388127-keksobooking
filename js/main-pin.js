'use strict';

(function () {
  var LIMIT_TOP_Y = 150;
  var LIMIT_BOTTOM_Y = 500;
  var LIMIT_LEFT_X = 0;
  var LIMIT_RIGHT_X = 1200;

  // Добавляем обработчик на главный пин, который можно перетаскивать по карте
  window.form.mapMainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    if (window.card.map.classList.contains('map--faded')) {
      window.form.adForm.classList.remove('ad-form--disabled');
      window.card.map.classList.remove('map--faded');
      window.form.setFieldsetsTrigger(false);
      window.pins.initPlaces();
      window.pins.setEventForButtons(window.places.slice(0, window.pins.MAX_OF_ELEM));
      window.pins.getAllFilters();
    }

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.form.mapMainPin.style.left = (window.form.mapMainPin.offsetLeft - shift.x) + 'px';
      window.form.mapMainPin.style.top = (window.form.mapMainPin.offsetTop - shift.y) + 'px';

      window.form.setCoordsToInput();

      var mapMainPinLeftCoord = parseInt(window.form.mapMainPin.style.left.split('px')[0], 10);
      var mapMainPinTopCoord = parseInt(window.form.mapMainPin.style.top.split('px')[0], 10);

      if (mapMainPinTopCoord < LIMIT_TOP_Y - window.form.MAIN_PIN_GAP_Y) {
        window.form.mapMainPin.style.top = LIMIT_TOP_Y - window.form.MAIN_PIN_GAP_Y + 'px';
      }

      if (mapMainPinTopCoord > LIMIT_BOTTOM_Y - window.form.MAIN_PIN_GAP_Y) {
        window.form.mapMainPin.style.top = LIMIT_BOTTOM_Y - window.form.MAIN_PIN_GAP_Y + 'px';
      }

      if (mapMainPinLeftCoord < LIMIT_LEFT_X - window.form.MAIN_PIN_GAP_X) {
        window.form.mapMainPin.style.left = LIMIT_LEFT_X - window.form.MAIN_PIN_GAP_X + 'px';
      }

      if (mapMainPinLeftCoord > LIMIT_RIGHT_X - window.form.MAIN_PIN_GAP_X) {
        window.form.mapMainPin.style.left = LIMIT_RIGHT_X - window.form.MAIN_PIN_GAP_X + 'px';
      }

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
