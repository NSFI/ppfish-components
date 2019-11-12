"use strict";

exports.__esModule = true;
exports.isDomElement = exports.getStyleProperty = exports.createNodeFromString = void 0;

/**
 * Turn a string into a node
 * @param  {String} htmlString to convert
 * @return {HTMLElement|Node}   Converted node element
 */
var createNodeFromString = function createNodeFromString(htmlString) {
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


exports.createNodeFromString = createNodeFromString;

var getStyleProperty = function getStyleProperty(element, propertyName, prefixVendor) {
  if (prefixVendor === void 0) {
    prefixVendor = false;
  }

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


exports.getStyleProperty = getStyleProperty;

var isDomElement = function isDomElement(element) {
  return element && typeof element === 'object' && 'nodeType' in element;
};

exports.isDomElement = isDomElement;