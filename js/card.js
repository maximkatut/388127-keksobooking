'use strict';

(function () {
  var TYPES_RUS = {'palace': 'Дворец', 'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'};
  var map = document.querySelector('.map');
  var cardSibling = document.querySelector('.map__filters-container');
  var mapCardTemplate = document.querySelector('template').content;
  var mapCardArticle = mapCardTemplate.querySelector('.map__card.popup');
  var mapCardPhotos = mapCardTemplate.querySelector('.popup__photos');
  var mapCardPhoto = mapCardTemplate.querySelector('.popup__photo');
  var mapCardAllPhoto;

  var mapCardCreatePhotos = function (j) {
    mapCardAllPhoto = mapCardTemplate.querySelectorAll('.popup__photo');
    for (var index = 0; index < mapCardAllPhoto.length; index++) {
      mapCardAllPhoto[index].remove();
    }
    if (window.places[j].offer.photos.length !== 0) {
      for (var i = 0; i < window.places[j].offer.photos.length; i++) {
        var mapCardPhotoX = mapCardPhoto.cloneNode(true);
        mapCardPhotoX.src = window.places[j].offer.photos[i];
        mapCardPhotos.appendChild(mapCardPhotoX);
      }
    }
  };

  var addMapCardFeatures = function (j) {
    var features = window.places[j].offer.features;
    var lis = document.createDocumentFragment();

    features.forEach(function (item) {
      var li = document.createElement('li');
      li.className = 'popup__feature';
      li.classList.add('popup__feature--' + item);
      li.textContent = item;
      lis.appendChild(li);
    });

    return lis;
  };

  var renderCard = function () {
    var cardElement = mapCardArticle.cloneNode(true);
    map.insertBefore(cardElement, cardSibling);
  };

  var initCard = function (i, arr) {
    deleteMapCard();
    var offer = arr[i].offer;
    var author = arr[i].author;
    mapCardTemplate.querySelector('.popup__title').textContent = offer.title;
    mapCardTemplate.querySelector('.popup__text--address').textContent = offer.address;
    mapCardTemplate.querySelector('.popup__text--price').textContent = offer.price + '₽/ночь';
    mapCardTemplate.querySelector('.popup__type').textContent = window.util.getValueObject(TYPES_RUS, arr[i].offer.type);
    mapCardTemplate.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнат для ' + offer.guests + ' гостей';
    mapCardTemplate.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
    var featuresNode = mapCardTemplate.querySelector('.popup__features');
    while (featuresNode.firstChild) {
      featuresNode.removeChild(featuresNode.firstChild);
    }
    featuresNode.appendChild(addMapCardFeatures(i));
    mapCardTemplate.querySelector('.popup__description').textContent = offer.description;
    mapCardCreatePhotos(i);
    mapCardTemplate.querySelector('.popup__avatar').src = author.avatar;
    renderCard();
    var mapCardClose = document.querySelector('.map__card .popup__close');
    mapCardClose.addEventListener('click', deleteMapCard);
    document.addEventListener('keydown', window.util.onPopupEscPress);
  };

  // Удаляем карточку

  var deleteMapCard = function () {
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.parentNode.removeChild(mapCard);
      document.removeEventListener('keydown', window.util.onPopupEscPress);
    }
  };

  window.card = {
    map: map,
    initCard: initCard,
    deleteMapCard: deleteMapCard
  };
})();
