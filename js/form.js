'use strict';

(function () {
  var MAX_PRICES = [1000, 0, 5000, 10000];
  var DATA_ROOMS = {
    one: [2],
    two: [2, 1],
    three: [2, 1, 0],
    hundred: [3]
  };
  var MAIN_PIN_GAP_X = 32;
  var MAIN_PIN_GAP_Y = 84;
  // Делаем неактивными формы добавления объявления
  var adFormFieldsets = document.querySelectorAll('.ad-form fieldset');
  var adForm = document.querySelector('.ad-form');

  var setFieldsetsTrigger = function (boo) {
    for (var i = 0; i < adFormFieldsets.length; i++) {
      adFormFieldsets[i].disabled = boo;
    }
  };
  setFieldsetsTrigger(true);

  // Добавляем ограничения на ввод данных для нового объявления

  var inputAdType = document.querySelector('#type');
  var inputAdPrice = document.querySelector('#price');

  inputAdType.addEventListener('change', function () {
    for (var i = 0; i < MAX_PRICES.length; i++) {
      if (inputAdType.selectedIndex === i) {
        inputAdPrice.placeholder = MAX_PRICES[i];
        inputAdPrice.min = MAX_PRICES[i];
      }
    }
  });

  var inputAdTimein = document.querySelector('#timein');
  var inputAdTimeout = document.querySelector('#timeout');

  var changeInputAdTime = function (timein, timeout) {
    if (timein.selectedIndex !== timeout.selectedIndex) {
      timeout.selectedIndex = timein.selectedIndex;
    }
  };

  inputAdTimein.addEventListener('change', function () {
    changeInputAdTime(inputAdTimein, inputAdTimeout);
  });
  inputAdTimeout.addEventListener('change', function () {
    changeInputAdTime(inputAdTimeout, inputAdTimein);
  });

  var inputAdRooms = document.querySelector('#room_number');
  var inputAdGuests = document.querySelector('#capacity');

  inputAdRooms.addEventListener('change', function (evt) {
    for (var j = 0; j < inputAdGuests.length; j++) {
      inputAdGuests[j].disabled = true;
    }
    var selectedRooms = evt.target.selectedIndex;
    var availableGuests = Object.values(DATA_ROOMS)[selectedRooms];
    for (var i = 0; i < availableGuests.length; i++) {
      inputAdGuests[availableGuests[i]].disabled = false;
      inputAdGuests.selectedIndex = availableGuests[0];
    }
  });

  // Определяем координаты mainPin с учетом размера, пин указывает на координаты острым концом
  var getMainPinXY = function (pos, gap) {
    return Number.parseInt(pos.split('px', 1), 10) + gap;
  };

  // Записываем значения координат в инпут формы
  var mapMainPin = document.querySelector('.map__pin--main');
  var inputAddress = document.querySelector('#address');
  var setCoordsToInput = function () {
    inputAddress.value = getMainPinXY(mapMainPin.style.left, MAIN_PIN_GAP_X) + ', ' +
                         getMainPinXY(mapMainPin.style.top, MAIN_PIN_GAP_Y);
  };
  setCoordsToInput();

  adForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      console.log('blabla');
    });
    evt.preventDefault();
  });

  window.form = {
    adForm: adForm,
    setFieldsetsTrigger: setFieldsetsTrigger,
    setCoordsToInput: setCoordsToInput,
    mapMainPin: mapMainPin,
    MAIN_PIN_GAP_X: MAIN_PIN_GAP_X,
    MAIN_PIN_GAP_Y: MAIN_PIN_GAP_Y
  };
})();
