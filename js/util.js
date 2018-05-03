window.util = (function () {
  var ESC_KEYCODE = 27;

  return {
    onPopupEscPress: function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        window.card.deleteMapCard();
      }
    }
  };
})();
