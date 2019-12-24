'use strict';

(function () {
  var elm = Element.prototype;
  var arrayPrototype = Array.prototype;
  if (!arrayPrototype.findIndex) {
    arrayPrototype.findIndex = function (predicate) {
      if (this === null) {
        throw new TypeError('Array.prototype.findIndex called on null or undefined');
      }
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }
      var list = Object(this);
      var length = list.length >>> 0;
      var thisArg = arguments[1];
      var value;

      for (var i = 0; i < length; i++) {
        value = list[i];
        if (predicate.call(thisArg, value, i, list)) {
          return i;
        }
      }
      return -1;
    };
  }

  (function (e) {
    var matches =
      e.matches ||
      e.matchesSelector ||
      e.webkitMatchesSelector ||
      e.mozMatchesSelector ||
      e.msMatchesSelector ||
      e.oMatchesSelector;

    if (!matches) {
      e.matches = e.matchesSelector = function matchesSome(selector) {
        var matchesS = document.querySelectorAll(selector);
        var th = this;
        return Array.prototype.some.call(matchesS, function (es) {
          return es === th;
        });
      };
    } else {
      e.matches = e.matchesSelector = matches;
    }
  })(elm);
  (function (n) {
    n.closest = n.closest || function (css) {
      var node = this;
      while (node) {
        if (node.matches(css)) {
          return node;
        } else {
          node = node.parentElement;
        }
      }
      return null;
    };
  })(elm);
})();
