'use strict';
window.compare = (function () {
  return {
    getNewPlaces: function () {
      window.places.filter(function(elem) {
        return elem.offer.rooms === 1;
      })
    }
  }
})();
