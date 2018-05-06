'use strict';

window.compare = (function () {
  var LOW_HOUSIN_PRICE = 0;
  var MID_HOUSING_PRICE = 10000;
  var HIGH_HOUSING_PRICE = 50000;

  return {
    getNewPlaces: function (evt, max) {
      var filteredPins = {};
      var selects = evt.currentTarget.querySelectorAll('.map__filter');
      var checkboxes = evt.currentTarget.querySelectorAll('[name=features]');

      for (var i = 0; i < selects.length; i++) {
        if (selects[i].value !== 'any') {
          filteredPins[selects[i].name] = selects[i].value;
        }
      }

      filteredPins.checkboxes = [];

      for (var j = 0; j < checkboxes.length; j++) {
        if (checkboxes[j].checked) {
          filteredPins.checkboxes.push(checkboxes[j].value);
        }
      }

      var filteredHousingType = function (item, index, array) {
        return filteredPins['housing-type'] ? filteredPins['housing-type'] === array[index].offer.type : true;
      };

      var filteredHousingPrice = function (item, index, array) {
        var valuePrice = true;

        switch (filteredPins['housing-price']) {
          case 'low':
            valuePrice = array[index].offer.price > LOW_HOUSIN_PRICE && array[index].offer.price < MID_HOUSING_PRICE;
            break;
          case 'middle':
            valuePrice = array[index].offer.price >= MID_HOUSING_PRICE && array[index].offer.price <= HIGH_HOUSING_PRICE;
            break;
          case 'high':
            valuePrice = array[index].offer.price > HIGH_HOUSING_PRICE;
            break;
        }

        return valuePrice;
      };

      var filteredHousingRooms = function (item, index, array) {
        return filteredPins['housing-rooms'] ? parseInt(filteredPins['housing-rooms'], 10) === array[index].offer.rooms : true;
      };

      var filteredHousingGuests = function (item, index, array) {
        return filteredPins['housing-guests'] ? parseInt(filteredPins['housing-guests'], 10) === array[index].offer.guests : true;
      };

      var filteredFeatures = function (item, index, array) {
        var isfeatures;
        var counter = 0;

        if (filteredPins.checkboxes.length > 0) {

          for (var k = 0; k < array.length; k++) {
            for (var t = 0; t < array[index].offer.features.length; t++) {
              if (filteredPins.checkboxes[k] === array[index].offer.features[t]) {
                counter++;
              }
            }
          }

          if (counter === filteredPins.checkboxes.length) {
            isfeatures = array[index];
          }

        } else {
          isfeatures = true;
        }

        return isfeatures;
      };

      var filteredAd = function (item, index, array) {
        return filteredHousingType(item, index, array) && filteredHousingPrice(item, index, array) && filteredHousingRooms(item, index, array) && filteredHousingGuests(item, index, array) && filteredFeatures(item, index, array) ? true : false;
      };

      return window.places.filter(filteredAd).slice(0, max);
    }
  };
})();
