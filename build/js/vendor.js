if (!Array.prototype.findIndex) {
  Array.prototype.findIndex = function(predicate) {
    if (this == null) {
      throw new TypeError(
        'Array.prototype.findIndex called on null or undefined'
      );
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

(function(e) {
  var matches =
    e.matches ||
    e.matchesSelector ||
    e.webkitMatchesSelector ||
    e.mozMatchesSelector ||
    e.msMatchesSelector ||
    e.oMatchesSelector;
  !matches
    ? (e.matches = e.matchesSelector = function matches(selector) {
        var matches = document.querySelectorAll(selector);
        var th = this;
        return Array.prototype.some.call(matches, function(e) {
          return e === th;
        });
      })
    : (e.matches = e.matchesSelector = matches);
})(Element.prototype);

(function(e) {
  e.closest =
    e.closest ||
    function(css) {
      var node = this;

      while (node) {
        if (node.matches(css)) return node;
        else node = node.parentElement;
      }
      return null;
    };
})(Element.prototype);
