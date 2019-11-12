"use strict";

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.string.fixed");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ColumnManager =
/*#__PURE__*/
function () {
  function ColumnManager(columns, elements) {
    _defineProperty(this, "_cached", {});

    this.columns = columns || this.normalize(elements);
  }

  var _proto = ColumnManager.prototype;

  _proto.isAnyColumnsFixed = function isAnyColumnsFixed() {
    var _this = this;

    return this._cache('isAnyColumnsFixed', function () {
      return _this.columns.some(function (column) {
        return !!column.fixed;
      });
    });
  };

  _proto.isAnyColumnsLeftFixed = function isAnyColumnsLeftFixed() {
    var _this2 = this;

    return this._cache('isAnyColumnsLeftFixed', function () {
      return _this2.columns.some(function (column) {
        return column.fixed === 'left' || column.fixed === true;
      });
    });
  };

  _proto.isAnyColumnsRightFixed = function isAnyColumnsRightFixed() {
    var _this3 = this;

    return this._cache('isAnyColumnsRightFixed', function () {
      return _this3.columns.some(function (column) {
        return column.fixed === 'right';
      });
    });
  };

  _proto.leftColumns = function leftColumns() {
    var _this4 = this;

    return this._cache('leftColumns', function () {
      return _this4.groupedColumns().filter(function (column) {
        return column.fixed === 'left' || column.fixed === true;
      });
    });
  };

  _proto.rightColumns = function rightColumns() {
    var _this5 = this;

    return this._cache('rightColumns', function () {
      return _this5.groupedColumns().filter(function (column) {
        return column.fixed === 'right';
      });
    });
  };

  _proto.leafColumns = function leafColumns() {
    var _this6 = this;

    return this._cache('leafColumns', function () {
      return _this6._leafColumns(_this6.columns);
    });
  };

  _proto.leftLeafColumns = function leftLeafColumns() {
    var _this7 = this;

    return this._cache('leftLeafColumns', function () {
      return _this7._leafColumns(_this7.leftColumns());
    });
  };

  _proto.rightLeafColumns = function rightLeafColumns() {
    var _this8 = this;

    return this._cache('rightLeafColumns', function () {
      return _this8._leafColumns(_this8.rightColumns());
    });
  } // add appropriate rowspan and colspan to column
  ;

  _proto.groupedColumns = function groupedColumns() {
    var _this9 = this;

    return this._cache('groupedColumns', function () {
      var _groupColumns = function _groupColumns(columns, currentRow, parentColumn, rows) {
        if (currentRow === void 0) {
          currentRow = 0;
        }

        if (parentColumn === void 0) {
          parentColumn = {};
        }

        if (rows === void 0) {
          rows = [];
        }

        // track how many rows we got
        rows[currentRow] = rows[currentRow] || [];
        var grouped = [];

        var setRowSpan = function setRowSpan(column) {
          var rowSpan = rows.length - currentRow;

          if (column && !column.children && // parent columns are supposed to be one row
          rowSpan > 1 && (!column.rowSpan || column.rowSpan < rowSpan)) {
            column.rowSpan = rowSpan;
          }
        };

        columns.forEach(function (column, index) {
          var newColumn = Object.assign({}, column);
          rows[currentRow].push(newColumn);
          parentColumn.colSpan = parentColumn.colSpan || 0;

          if (newColumn.children && newColumn.children.length > 0) {
            newColumn.children = _groupColumns(newColumn.children, currentRow + 1, newColumn, rows);
            parentColumn.colSpan += newColumn.colSpan;
          } else {
            parentColumn.colSpan++;
          } // update rowspan to all same row columns


          for (var i = 0; i < rows[currentRow].length - 1; ++i) {
            setRowSpan(rows[currentRow][i]);
          } // last column, update rowspan immediately


          if (index + 1 === columns.length) {
            setRowSpan(newColumn);
          }

          grouped.push(newColumn);
        });
        return grouped;
      };

      return _groupColumns(_this9.columns);
    });
  };

  _proto.normalize = function normalize(elements) {
    var _this10 = this;

    var columns = [];

    _react.default.Children.forEach(elements, function (element) {
      if (!_react.default.isValidElement(element)) {
        return;
      }

      var column = Object.assign({}, element.props);

      if (element.key) {
        column.key = element.key;
      }

      if (element.type.isTableColumnGroup) {
        column.children = _this10.normalize(column.children);
      }

      columns.push(column);
    });

    return columns;
  };

  _proto.reset = function reset(columns, elements) {
    this.columns = columns || this.normalize(elements);
    this._cached = {};
  };

  _proto._cache = function _cache(name, fn) {
    if (name in this._cached) {
      return this._cached[name];
    }

    this._cached[name] = fn();
    return this._cached[name];
  };

  _proto._leafColumns = function _leafColumns(columns) {
    var _this11 = this;

    var leafColumns = [];
    columns.forEach(function (column) {
      if (!column.children) {
        leafColumns.push(column);
      } else {
        leafColumns.push.apply(leafColumns, _this11._leafColumns(column.children));
      }
    });
    return leafColumns;
  };

  return ColumnManager;
}();

exports.default = ColumnManager;