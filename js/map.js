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
var TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
var CHECKINS = [
  '12:00',
  '13:00',
  '14:00'
];
var CHECKOUTS = CHECKINS;
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

var randomNumbers = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var avatarsCopy = AVATARS.slice();
var titlesCopy = TITLES.slice();

var randomAvatar = function () {
  var firstEl = avatarsCopy[0];
  avatarsCopy.splice(0, 1);
  return firstEl;
};

var randomTitle = function () {
  var firstEl = titlesCopy[0];
  titlesCopy.splice(0, 1);
  return firstEl;
};

var randomLocationX = function () {
  return Math.round(randomNumbers(300, 900) / 10) * 10;
};

var randomLocationY = function () {
  return Math.round(randomNumbers(150, 500) / 10) * 10;
};

var randomType = function () {
  var randomTypeX = randomNumbers(0, TYPES.length - 1);
  return TYPES[randomTypeX];
};

var randomCheckin = function () {
  var randomCheckinX = randomNumbers(0, CHECKINS.length - 1);
  return CHECKINS[randomCheckinX];
};

var randomCheckout = function () {
  var randomCheckoutX = randomNumbers(0, CHECKOUTS.length - 1);
  return CHECKOUTS[randomCheckoutX];
};

var randomFeatures = function () {
  var randomFeaturesX = [];
  var featuresCopy = FEATURES.slice();
  for (var i = 0; i < randomNumbers(1, FEATURES.length); i++) {
    var rndElemIndex = randomNumbers(0, featuresCopy.length - 1);
    var feature = featuresCopy[rndElemIndex];
    featuresCopy.splice(rndElemIndex, 1);
    randomFeaturesX.splice(0, 0, feature);
  }
  return randomFeaturesX;
};

var randomPhotos = function () {
  var randomPhotosX = [];
  var photosCopy = PHOTOS.slice();
  for (var i = 0; i < PHOTOS.length; i++) {
    var rndElemIndex = randomNumbers(0, photosCopy.length - 1);
    var photo = photosCopy[rndElemIndex];
    photosCopy.splice(rndElemIndex, 1);
    randomPhotosX.splice(0, 0, photo);
  }
  return randomPhotosX;
};

var randomPlace = function () {
  var x = randomLocationX();
  var y = randomLocationY();
  return {
    author: {
      avatar: randomAvatar()
    },
    offer: {
      title: randomTitle(),
      address: x + ', ' + y,
      price: Math.round(randomNumbers(1000, 1000000) / 100) * 100,
      type: randomType(),
      rooms: randomNumbers(1, 5),
      guests: randomNumbers(1, 6),
      checkin: randomCheckin(),
      checkout: randomCheckout(),
      features: randomFeatures(),
      description: 'Здесь должен быть какой-то description',
      photos: randomPhotos()
    },
    location: {
      x: x,
      y: y
    }
  }
};

var initPlaces = function () {
  for (var i = 0; i < 8; i++) {
    places[i] = randomPlace();
  }
};

var mapPins = document.querySelector('.map__pins');

var renderPlaces = function () {
  for (var i = 0; i < 8; i++) {
    var pin = document.createElement('button');
    var img = document.createElement('img');
    pin.type = 'button';
    pin.classList.add('map__pin');
    pin.style.left = places[i].location.x - GAP_X + 'px';
    pin.style.top = places[i].location.y - GAP_Y + 'px';

    img.src = places[i].author.avatar;
    img.width = IMG_WIDTH;
    img.height = IMG_HEIGHT;
    img.draggable = false;
    img.alt = places[i].offer.title;

    mapPins.appendChild(pin);
    pin.appendChild(img);
  }
};

initPlaces();
renderPlaces();

var map = document.querySelector('.map');
var cardSibling = document.querySelector('.map__filters-container');
var mapCardTemplate = document.querySelector('template').content;
var mapCardPhotos = mapCardTemplate.querySelector('.popup__photos');
var mapCardPhoto = mapCardTemplate.querySelector('.popup__photo');

var mapCardChooseType = function () {
  switch (places[0].offer.type) {
    case 'palace':
      return 'Палац';
    case 'flat':
      return 'Квартира';
    case 'house':
      return 'Дом';
    case 'bungalo':
      return 'Бунгало';
  }
};

var mapCardCreatePhotos = function () {
  for (var i = 0; i < 3; i++) {
    var mapCardPhotoX = mapCardPhoto.cloneNode(true);
    mapCardPhotos.appendChild(mapCardPhotoX);
    mapCardPhotoX.src = places[0].offer.photos[i];
  }
  mapCardPhoto.parentNode.removeChild(mapCardPhoto);
};

var mapCardFeaturesCycle = function () {
  var mapCardFeaturesString = '';
  for (var i = 0; i < places[0].offer.features.length; i++) {
    mapCardFeaturesString += places[0].offer.features[i];
    mapCardFeaturesString += (i < places[0].offer.features.length - 1) ? ', ' : '';
  }
  return mapCardFeaturesString;
};

var renderCard = function () {
  var cardElement = mapCardTemplate.cloneNode(true);
  map.insertBefore(cardElement, cardSibling);
};

var initCard = function () {
  mapCardTemplate.querySelector('.popup__title').textContent = places[0].offer.title;
  mapCardTemplate.querySelector('.popup__text--address').textContent = places[0].offer.address;
  mapCardTemplate.querySelector('.popup__text--price').textContent = places[0].offer.price + '₽/ночь';
  mapCardTemplate.querySelector('.popup__type').textContent = mapCardChooseType();
  mapCardTemplate.querySelector('.popup__text--capacity').textContent = places[0].offer.rooms + ' комнат для ' + places[0].offer.guests + ' гостей';
  mapCardTemplate.querySelector('.popup__text--time').textContent = 'Заезд после ' + places[0].offer.checkin + ', выезд до ' + places[0].offer.checkout;
  mapCardTemplate.querySelector('.popup__features').textContent = mapCardFeaturesCycle();
  mapCardTemplate.querySelector('.popup__description').textContent = places[0].offer.description;
  mapCardCreatePhotos();
  mapCardTemplate.querySelector('.popup__avatar').src = places[0].author.avatar;
  renderCard();
};

initCard();
