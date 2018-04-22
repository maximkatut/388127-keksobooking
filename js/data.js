'use strict';

(function () {
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

  window.data = {
    getRandomPlace: getRandomPlace,
    TYPES: TYPES,
    PHOTOS: PHOTOS
  };
})();
