'use strict';

(function () {
  var GAP_X = 25;
  var GAP_Y = 70;
  var IMG_WIDTH = 40;
  var IMG_HEIGHT = 40;
  var REMOVE_ERROR_TIME = 5000;

  // Инициализируем пины(массив пинов)
  var initPlaces = function () {
    renderPlaces(window.places);
  };

  var mapPins = document.querySelector('.map__pins');

  // Производит добавление в ДОМ
  var renderPlaces = function (places) {
    for (var i = 0; i < places.length; i++) {
      var pin = document.createElement('button');
      var img = document.createElement('img');
      pin.type = 'button';
      pin.classList.add('map__pin');
      pin.style.left = places[i].location.x - GAP_X + 'px';
      pin.style.top = places[i].location.y - GAP_Y + 'px';
      pin.setAttribute('data-index', i);

      img.src = places[i].author.avatar;
      img.width = IMG_WIDTH;
      img.height = IMG_HEIGHT;
      img.draggable = false;
      img.alt = places[i].offer.title;

      mapPins.appendChild(pin);
      pin.appendChild(img);
    }
    allMapPinButtons = document.querySelectorAll('button[type="button"].map__pin');
  };


  // Удаляет все пины

  var deleteAllPins = function () {
    var allPins = document.querySelectorAll('button[type="button"].map__pin');
    for (var i = 0; i < allPins.length; i++) {
      allPins[i].remove();
    }
  };

  // Добавляет обработчик события на каждый пин

  var allMapPinButtons;

  var setEventForButtons = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      allMapPinButtons[i].addEventListener('click', function (e) {
        var target = e.target;
        if (target.tagName === 'IMG') {
          target = target.parentNode;
        }
        var index = target.getAttribute('data-index');
        window.card.initCard(index, arr);
      });
    }
  };

  // Находит все инпуты в форме фильтрации
  var getAllFilters = function () {
    var allFilters = document.querySelectorAll('.map__filters');
    for (var i = 0; i < allFilters.length; i++) {
      allFilters[i].addEventListener('change', function() {
        updatePlaces();
      });
    }
  }

  // Перерисовывает пины на карте с учетом фильтрации

  var updatePlaces = function (places) {
    deleteAllPins();
    var newPlaces = window.compare.getNewPlaces();
    renderPlaces(newPlaces);
    setEventForButtons(newPlaces);
    window.card.deleteMapCard();
  };

  var successHandler = function (places) {
    window.places = places;
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error');
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
    setTimeout(function () {
      node.remove();
    }, REMOVE_ERROR_TIME);
  };

  window.backend.load(successHandler, errorHandler);
  window.pins = {
    initPlaces: initPlaces,
    setEventForButtons: setEventForButtons,
    getAllFilters: getAllFilters,
    deleteAllPins: deleteAllPins
  };
})();
