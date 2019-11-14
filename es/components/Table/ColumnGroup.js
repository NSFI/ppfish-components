var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

import * as React from 'react';

var ColumnGroup =
/** @class */
function (_super) {
  __extends(ColumnGroup, _super);

  function ColumnGroup() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  ColumnGroup.__FISHD_TABLE_COLUMN_GROUP = true;
  return ColumnGroup;
}(React.Component);

export default ColumnGroup;