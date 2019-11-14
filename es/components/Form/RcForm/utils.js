function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* eslint-disable no-console */
import hoistStatics from 'hoist-non-react-statics';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'WrappedComponent';
}

export function argumentContainer(Container, WrappedComponent) {
  /* eslint no-param-reassign:0 */
  Container.displayName = "Form(".concat(getDisplayName(WrappedComponent), ")");
  Container.WrappedComponent = WrappedComponent;
  return hoistStatics(Container, WrappedComponent);
}
export function identity(obj) {
  return obj;
}
export function flattenArray(arr) {
  return Array.prototype.concat.apply([], arr);
}
export function treeTraverse() {
  var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var tree = arguments.length > 1 ? arguments[1] : undefined;
  var isLeafNode = arguments.length > 2 ? arguments[2] : undefined;
  var errorMessage = arguments.length > 3 ? arguments[3] : undefined;
  var callback = arguments.length > 4 ? arguments[4] : undefined;

  if (isLeafNode(path, tree)) {
    callback(path, tree);
  } else if (tree === undefined || tree === null) {
    return;
  } else if (Array.isArray(tree)) {
    tree.forEach(function (subTree, index) {
      return treeTraverse("".concat(path, "[").concat(index, "]"), subTree, isLeafNode, errorMessage, callback);
    });
  } else {
    // It's object and not a leaf node
    if (_typeof(tree) !== 'object') {
      console.error(errorMessage);
      return;
    }

    Object.keys(tree).forEach(function (subTreeKey) {
      var subTree = tree[subTreeKey];
      treeTraverse("".concat(path).concat(path ? '.' : '').concat(subTreeKey), subTree, isLeafNode, errorMessage, callback);
    });
  }
}
export function flattenFields(maybeNestedFields, isLeafNode, errorMessage) {
  var fields = {};
  treeTraverse(undefined, maybeNestedFields, isLeafNode, errorMessage, function (path, node) {
    fields[path] = node;
  });
  return fields;
}
export function normalizeValidateRules(validate, rules, validateTrigger) {
  var validateRules = validate.map(function (item) {
    var newItem = _objectSpread({}, item, {
      trigger: item.trigger || []
    });

    if (typeof newItem.trigger === 'string') {
      newItem.trigger = [newItem.trigger];
    }

    return newItem;
  });

  if (rules) {
    validateRules.push({
      trigger: validateTrigger ? [].concat(validateTrigger) : [],
      rules: rules
    });
  }

  return validateRules;
}
export function getValidateTriggers(validateRules) {
  return validateRules.filter(function (item) {
    return !!item.rules && item.rules.length;
  }).map(function (item) {
    return item.trigger;
  }).reduce(function (pre, curr) {
    return pre.concat(curr);
  }, []);
}
export function getValueFromEvent(e) {
  // To support custom element
  if (!e || !e.target) {
    return e;
  }

  var target = e.target;
  return target.type === 'checkbox' ? target.checked : target.value;
}
export function getErrorStrs(errors) {
  if (errors) {
    return errors.map(function (e) {
      if (e && e.message) {
        return e.message;
      }

      return e;
    });
  }

  return errors;
}
export function getParams(ns, opt, cb) {
  var names = ns;
  var options = opt;
  var callback = cb;

  if (cb === undefined) {
    if (typeof names === 'function') {
      callback = names;
      options = {};
      names = undefined;
    } else if (Array.isArray(names)) {
      if (typeof options === 'function') {
        callback = options;
        options = {};
      } else {
        options = options || {};
      }
    } else {
      callback = options;
      options = names || {};
      names = undefined;
    }
  }

  return {
    names: names,
    options: options,
    callback: callback
  };
}
export function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}
export function hasRules(validate) {
  if (validate) {
    return validate.some(function (item) {
      return item.rules && item.rules.length;
    });
  }

  return false;
}
export function startsWith(str, prefix) {
  return str.lastIndexOf(prefix, 0) === 0;
}