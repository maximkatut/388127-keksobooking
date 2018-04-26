'use strict';

(function () {
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
    if (places[j].offer.photos.length !== 0) {
      for (var i = 0; i < window.places[j].offer.photos.length; i++) {
        var mapCardPhotoX = mapCardPhoto.cloneNode(true);
        mapCardPhotoX.src = window.places[j].offer.photos[i];
        mapCardPhotos.appendChild(mapCardPhotoX);
      }
    }
  };

  var mapCardFeaturesCycle = function (j) {
    var offer = window.places[j].offer;
    var mapCardFeaturesString = '';
    for (var i = 0; i < offer.features.length; i++) {
      mapCardFeaturesString += offer.features[i];
      mapCardFeaturesString += (i < offer.features.length - 1) ? ', ' : '';
    }
    return mapCardFeaturesString;
  };

  var renderCard = function () {
    var cardElement = mapCardArticle.cloneNode(true);
    map.insertBefore(cardElement, cardSibling);
  };

  var initCard = function (i) {
    deleteMapCard();
    var offer = window.places[i].offer;
    var author = window.places[i].author;
    mapCardTemplate.querySelector('.popup__title').textContent = offer.title;
    mapCardTemplate.querySelector('.popup__text--address').textContent = offer.address;
    mapCardTemplate.querySelector('.popup__text--price').textContent = offer.price + '₽/ночь';
    mapCardTemplate.querySelector('.popup__type').textContent = offer.type;
    mapCardTemplate.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнат для ' + offer.guests + ' гостей';
    mapCardTemplate.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
    mapCardTemplate.querySelector('.popup__features').textContent = mapCardFeaturesCycle(i);
    mapCardTemplate.querySelector('.popup__description').textContent = offer.description;
    mapCardCreatePhotos(i);
    mapCardTemplate.querySelector('.popup__avatar').src = author.avatar;
    renderCard();
    var mapCardClose = document.querySelector('.map__card .popup__close');
    mapCardClose.addEventListener('click', deleteMapCard);
  };

  // Удаляем карточку

  var deleteMapCard = function () {
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.parentNode.removeChild(mapCard);
    }
  };

  window.card = {
    map: map,
    initCard: initCard
  };
})();
