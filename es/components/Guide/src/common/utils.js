function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Turn a string into a node
 * @param  {String} htmlString to convert
 * @return {HTMLElement|Node}   Converted node element
 */
export var createNodeFromString = function createNodeFromString(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim(); // Change this to div.childNodes to support multiple top-level nodes

  return div.firstChild;
};
/**
 * Gets the CSS property from the given element
 * @param {HTMLElement|Node} element
 * @param {string} propertyName
 * @param {boolean} prefixVendor
 * @return {string}
 */

export var getStyleProperty = function getStyleProperty(element, propertyName) {
  var prefixVendor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (prefixVendor) {
    var prefixes = ['', '-webkit-', '-ms-', 'moz-', '-o-'];

    for (var counter = 0; counter < prefixes.length; counter++) {
      var prefixedProperty = prefixes[counter] + propertyName;
      var foundValue = getStyleProperty(element, prefixedProperty);

      if (foundValue) {
        return foundValue;
      }
    }

    return '';
  }

  var propertyValue = '';

  if (element.currentStyle) {
    propertyValue = element.currentStyle[propertyName];
  } else if (document.defaultView && document.defaultView.getComputedStyle) {
    propertyValue = document.defaultView.getComputedStyle(element, null).getPropertyValue(propertyName);
  }

  return propertyValue && propertyValue.toLowerCase ? propertyValue.toLowerCase() : propertyValue;
};
/**
 * Checks if the passed element is dom object or not
 * @param element
 * @returns {boolean}
 */

export var isDomElement = function isDomElement(element) {
  return element && _typeof(element) === 'object' && 'nodeType' in element;
};