var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

import * as React from 'react';
export function flatArray(data, childrenName) {
  if (data === void 0) {
    data = [];
  }

  if (childrenName === void 0) {
    childrenName = 'children';
  }

  var result = [];

  var loop = function loop(array) {
    array.forEach(function (item) {
      if (item[childrenName]) {
        var newItem = __assign({}, item);

        delete newItem[childrenName];
        result.push(newItem);

        if (item[childrenName].length > 0) {
          loop(item[childrenName]);
        }
      } else {
        result.push(item);
      }
    });
  };

  loop(data);
  return result;
}
export function treeMap(tree, mapper, childrenName) {
  if (childrenName === void 0) {
    childrenName = 'children';
  }

  return tree.map(function (node, index) {
    var extra = {};

    if (node[childrenName]) {
      extra[childrenName] = treeMap(node[childrenName], mapper, childrenName);
    }

    return __assign(__assign({}, mapper(node, index)), extra);
  });
}
export function flatFilter(tree, callback) {
  return tree.reduce(function (acc, node) {
    if (callback(node)) {
      acc.push(node);
    }

    if (node.children) {
      var children = flatFilter(node.children, callback);
      acc.push.apply(acc, children);
    }

    return acc;
  }, []);
}
export function normalizeColumns(elements) {
  var columns = [];
  React.Children.forEach(elements, function (element) {
    if (!React.isValidElement(element)) {
      return;
    }

    var column = __assign({}, element.props);

    if (element.key) {
      column.key = element.key;
    }

    if (element.type && element.type.__FISHD_TABLE_COLUMN_GROUP) {
      column.children = normalizeColumns(column.children);
    }

    columns.push(column);
  });
  return columns;
}