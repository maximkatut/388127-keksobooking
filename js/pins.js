'use strict';

(function () {
  var GAP_X = 25;
  var GAP_Y = 70;
  var IMG_WIDTH = 40;
  var IMG_HEIGHT = 40;
  var places = [];

  // Инициализируем пины(массив пинов)
  var initPlaces = function () {
    for (var i = 0; i < 8; i++) {
      places[i] = window.data.getRandomPlace();
    }
    renderPlaces();
  };

  var mapPins = document.querySelector('.map__pins');

  var renderPlaces = function () {
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

  // Добавляем обработчик события на каждый пин

  var allMapPinButtons;

  var setEventForButtons = function () {
    for (var i = 0; i < places.length; i++) {
      allMapPinButtons[i].addEventListener('click', function (e) {
        var target = e.target;
        if (target.tagName === 'IMG') {
          target = target.parentNode;
        }
        var index = target.getAttribute('data-index');
        window.card.initCard(index);
      });
    }
  };

  window.pins = {
    initPlaces: initPlaces,
    places: places,
    setEventForButtons: setEventForButtons
  };
})();
