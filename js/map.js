'use strict';

var places = [];
var AVATARS = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png'
];
var TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var TYPES = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом',
  palace: 'Палац'
};
var CHECK_TIMES = [
  '12:00',
  '13:00',
  '14:00'
];
var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var GAP_X = 25;
var GAP_Y = 70;
var IMG_WIDTH = 40;
var IMG_HEIGHT = 40;
var X_MIN = 300;
var X_MAX = 900;
var Y_MIN = 150;
var Y_MAX = 500;
var PRICE_MIN = 1000;
var PRICE_MAX = 1000000;
var ROOMS_MIN = 1;
var ROOMS_MAX = 5;
var GUESTS_MIN = 1;
var GUESTS_MAX = 6;
var MAIN_PIN_GAP_X = 32;
var MAIN_PIN_GAP_Y = 84;

var generateRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var avatarsCopy = AVATARS.slice();
var titlesCopy = TITLES.slice();

var getAvatar = function () {
  return avatarsCopy.shift();
};

var getTitle = function () {
  return titlesCopy.shift();
};

var getRandomLocation = function (min, max) {
  return Math.round(generateRandomNumber(min, max) / 10) * 10;
};

var getRandomType = function () {
  var randomTypeX = generateRandomNumber(0, Object.keys(TYPES).length - 1);
  return Object.keys(TYPES)[randomTypeX];
};

var getRandomCheckInOut = function (arr) {
  var randomCheck = generateRandomNumber(0, arr.length - 1);
  return arr[randomCheck];
};

var getRandomFeatures = function () {
  var randomFeaturesX = [];
  var featuresCopy = FEATURES.slice();
  for (var i = 0; i < generateRandomNumber(1, FEATURES.length); i++) {
    var rndElemIndex = generateRandomNumber(0, featuresCopy.length - 1);
    var feature = featuresCopy[rndElemIndex];
    featuresCopy.splice(rndElemIndex, 1);
    randomFeaturesX.splice(0, 0, feature);
  }
  return randomFeaturesX;
};

var getRandomPhotos = function () {
  var randomPhotosX = [];
  var photosCopy = PHOTOS.slice();
  for (var i = 0; i < PHOTOS.length; i++) {
    var rndElemIndex = generateRandomNumber(0, photosCopy.length - 1);
    var photo = photosCopy[rndElemIndex];
    photosCopy.splice(rndElemIndex, 1);
    randomPhotosX.splice(0, 0, photo);
  }
  return randomPhotosX;
};

var getRandomPlace = function () {
  var x = getRandomLocation(X_MIN, X_MAX);
  var y = getRandomLocation(Y_MIN, Y_MAX);
  return {
    author: {
      avatar: getAvatar()
    },
    offer: {
      title: getTitle(),
      address: x + ', ' + y,
      price: Math.round(generateRandomNumber(PRICE_MIN, PRICE_MAX) / 100) * 100,
      type: getRandomType(),
      rooms: generateRandomNumber(ROOMS_MIN, ROOMS_MAX),
      guests: generateRandomNumber(GUESTS_MIN, GUESTS_MAX),
      checkin: getRandomCheckInOut(CHECK_TIMES),
      checkout: getRandomCheckInOut(CHECK_TIMES),
      features: getRandomFeatures(),
      description: 'Здесь должен быть какой-то description',
      photos: getRandomPhotos()
    },
    location: {
      x: x,
      y: y
    }
  };
};

var initPlaces = function () {
  for (var i = 0; i < 8; i++) {
    places[i] = getRandomPlace();
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

var map = document.querySelector('.map');
var cardSibling = document.querySelector('.map__filters-container');
var mapCardTemplate = document.querySelector('template').content;
var mapCardArticle = mapCardTemplate.querySelector('.map__card.popup');
var mapCardPhotos = mapCardTemplate.querySelector('.popup__photos');
var mapCardPhoto = mapCardTemplate.querySelector('.popup__photo');
var mapCardAllPhoto;

var mapCardChooseType = function (elem) {
  return TYPES[elem];
};

var mapCardCreatePhotos = function (j) {
  mapCardAllPhoto = mapCardTemplate.querySelectorAll('.popup__photo');
  for (var index = 1; index < mapCardAllPhoto.length; index++) {
    mapCardAllPhoto[index].parentNode.removeChild(mapCardAllPhoto[index]);
  }
  mapCardPhoto.src = places[j].offer.photos[0];
  for (var i = 1; i < PHOTOS.length; i++) {
    var mapCardPhotoX = mapCardPhoto.cloneNode(true);
    mapCardPhotoX.src = places[j].offer.photos[i];
    mapCardPhotos.appendChild(mapCardPhotoX);
  }
};

var mapCardFeaturesCycle = function (j) {
  var mapCardFeaturesString = '';
  for (var i = 0; i < places[j].offer.features.length; i++) {
    mapCardFeaturesString += places[j].offer.features[i];
    mapCardFeaturesString += (i < places[j].offer.features.length - 1) ? ', ' : '';
  }
  return mapCardFeaturesString;
};

var renderCard = function () {
  var cardElement = mapCardArticle.cloneNode(true);
  map.insertBefore(cardElement, cardSibling);
};

var initCard = function (i) {
  deleteMapCard();
  mapCardTemplate.querySelector('.popup__title').textContent = places[i].offer.title;
  mapCardTemplate.querySelector('.popup__text--address').textContent = places[i].offer.address;
  mapCardTemplate.querySelector('.popup__text--price').textContent = places[i].offer.price + '₽/ночь';
  mapCardTemplate.querySelector('.popup__type').textContent = mapCardChooseType(places[i].offer.type);
  mapCardTemplate.querySelector('.popup__text--capacity').textContent = places[i].offer.rooms + ' комнат для ' + places[i].offer.guests + ' гостей';
  mapCardTemplate.querySelector('.popup__text--time').textContent = 'Заезд после ' + places[i].offer.checkin + ', выезд до ' + places[i].offer.checkout;
  mapCardTemplate.querySelector('.popup__features').textContent = mapCardFeaturesCycle(i);
  mapCardTemplate.querySelector('.popup__description').textContent = places[i].offer.description;
  mapCardCreatePhotos(i);
  mapCardTemplate.querySelector('.popup__avatar').src = places[i].author.avatar;
  renderCard();
  var mapCardClose = document.querySelector('.map__card .popup__close');
  mapCardClose.addEventListener('click', deleteMapCard);
};

// Делаем неактивными формы добавления объявления
var adFormFieldsets = document.querySelectorAll('.ad-form fieldset');
var adForm = document.querySelector('.ad-form');

var setFieldsetsTrigger = function (boo) {
  for (var i = 0; i < adFormFieldsets.length; i++) {
    adFormFieldsets[i].disabled = boo;
  }
};

setFieldsetsTrigger(true);

// При отпускании пина активаируются формы и инициализируются пины на карте.
// Выключает повторное выполнение события на mainPin
var dropMainPin = function () {
  adForm.classList.remove('ad-form--disabled');
  map.classList.remove('map--faded');
  setFieldsetsTrigger(false);
  initPlaces();
  mapMainPin.removeEventListener('mouseup', dropMainPin);
  setEventForButtons();
};

var mapMainPin = document.querySelector('.map__pin--main');
mapMainPin.addEventListener('mouseup', dropMainPin);
var mapMainPinX = mapMainPin.style.left;
var mapMainPinY = mapMainPin.style.top;

// Определяем координаты mainPin с учетом размера, пин указывает на координаты острым концом
var getMainPinXY = function (pos, gap) {
  return Number.parseInt(pos.split('px', 1), 10) + gap;
};

// Записываем значения координат в инпут формы
var inputAddress = document.querySelector('#address');
inputAddress.value = getMainPinXY(mapMainPinX, MAIN_PIN_GAP_X) + ', ' + getMainPinXY(mapMainPinY, MAIN_PIN_GAP_Y);


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
      initCard(index);
    });
  }
};

// Удаляем карточку

var deleteMapCard = function () {
  var mapCard = document.querySelector('.map__card');
  if (mapCard) {
    mapCard.parentNode.removeChild(mapCard);
  }
};
