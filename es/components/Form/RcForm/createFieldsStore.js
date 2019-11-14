function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import set from 'lodash/set';
import createFormField, { isFormField } from './createFormField';
import { flattenFields as _flattenFields, getErrorStrs, startsWith } from './utils';

function partOf(a, b) {
  return b.indexOf(a) === 0 && ['.', '['].indexOf(b[a.length]) !== -1;
}

var FieldsStore =
/*#__PURE__*/
function () {
  function FieldsStore(_fields) {
    var _this = this;

    _classCallCheck(this, FieldsStore);

    _defineProperty(this, "setFieldsInitialValue", function (initialValues) {
      var flattenedInitialValues = _this.flattenRegisteredFields(initialValues);

      var fieldsMeta = _this.fieldsMeta;
      Object.keys(flattenedInitialValues).forEach(function (name) {
        if (fieldsMeta[name]) {
          _this.setFieldMeta(name, _objectSpread({}, _this.getFieldMeta(name), {
            initialValue: flattenedInitialValues[name]
          }));
        }
      });
    });

    _defineProperty(this, "getAllValues", function () {
      var fieldsMeta = _this.fieldsMeta,
          fields = _this.fields;
      return Object.keys(fieldsMeta).reduce(function (acc, name) {
        return set(acc, name, _this.getValueFromFields(name, fields));
      }, {});
    });

    _defineProperty(this, "getFieldsValue", function (names) {
      return _this.getNestedFields(names, _this.getFieldValue);
    });

    _defineProperty(this, "getFieldValue", function (name) {
      var fields = _this.fields;
      return _this.getNestedField(name, function (fullName) {
        return _this.getValueFromFields(fullName, fields);
      });
    });

    _defineProperty(this, "getFieldsError", function (names) {
      return _this.getNestedFields(names, _this.getFieldError);
    });

    _defineProperty(this, "getFieldError", function (name) {
      return _this.getNestedField(name, function (fullName) {
        return getErrorStrs(_this.getFieldMember(fullName, 'errors'));
      });
    });

    _defineProperty(this, "isFieldValidating", function (name) {
      return _this.getFieldMember(name, 'validating');
    });

    _defineProperty(this, "isFieldsValidating", function (ns) {
      var names = ns || _this.getValidFieldsName();

      return names.some(function (n) {
        return _this.isFieldValidating(n);
      });
    });

    _defineProperty(this, "isFieldTouched", function (name) {
      return _this.getFieldMember(name, 'touched');
    });

    _defineProperty(this, "isFieldsTouched", function (ns) {
      var names = ns || _this.getValidFieldsName();

      return names.some(function (n) {
        return _this.isFieldTouched(n);
      });
    });

    this.fields = this.flattenFields(_fields);
    this.fieldsMeta = {};
  }

  _createClass(FieldsStore, [{
    key: "updateFields",
    value: function updateFields(fields) {
      this.fields = this.flattenFields(fields);
    }
  }, {
    key: "flattenFields",
    value: function flattenFields(fields) {
      return _flattenFields(fields, function (_, node) {
        return isFormField(node);
      }, 'You must wrap field data with `createFormField`.');
    }
  }, {
    key: "flattenRegisteredFields",
    value: function flattenRegisteredFields(fields) {
      var validFieldsName = this.getAllFieldsName();
      return _flattenFields(fields, function (path) {
        return validFieldsName.indexOf(path) >= 0;
      }, 'You cannot set field before registering it.');
    }
  }, {
    key: "setFields",
    value: function setFields(fields) {
      var _this2 = this;

      var fieldsMeta = this.fieldsMeta;

      var nowFields = _objectSpread({}, this.fields, {}, fields);

      var nowValues = {};
      Object.keys(fieldsMeta).forEach(function (f) {
        return nowValues[f] = _this2.getValueFromFields(f, nowFields);
      });
      Object.keys(nowValues).forEach(function (f) {
        var value = nowValues[f];

        var fieldMeta = _this2.getFieldMeta(f);

        if (fieldMeta && fieldMeta.normalize) {
          var nowValue = fieldMeta.normalize(value, _this2.getValueFromFields(f, _this2.fields), nowValues);

          if (nowValue !== value) {
            nowFields[f] = _objectSpread({}, nowFields[f], {
              value: nowValue
            });
          }
        }
      });
      this.fields = nowFields;
    }
  }, {
    key: "resetFields",
    value: function resetFields(ns) {
      var fields = this.fields;
      var names = ns ? this.getValidFieldsFullName(ns) : this.getAllFieldsName();
      return names.reduce(function (acc, name) {
        var field = fields[name];

        if (field && 'value' in field) {
          acc[name] = {};
        }

        return acc;
      }, {});
    }
  }, {
    key: "setFieldMeta",
    value: function setFieldMeta(name, meta) {
      this.fieldsMeta[name] = meta;
    }
  }, {
    key: "getFieldMeta",
    value: function getFieldMeta(name) {
      this.fieldsMeta[name] = this.fieldsMeta[name] || {};
      return this.fieldsMeta[name];
    }
  }, {
    key: "getValueFromFields",
    value: function getValueFromFields(name, fields) {
      var field = fields[name];

      if (field && 'value' in field) {
        return field.value;
      }

      var fieldMeta = this.getFieldMeta(name);
      return fieldMeta && fieldMeta.initialValue;
    }
  }, {
    key: "getValidFieldsName",
    value: function getValidFieldsName() {
      var _this3 = this;

      var fieldsMeta = this.fieldsMeta;
      return fieldsMeta ? Object.keys(fieldsMeta).filter(function (name) {
        return !_this3.getFieldMeta(name).hidden;
      }) : [];
    }
  }, {
    key: "getAllFieldsName",
    value: function getAllFieldsName() {
      var fieldsMeta = this.fieldsMeta;
      return fieldsMeta ? Object.keys(fieldsMeta) : [];
    }
  }, {
    key: "getValidFieldsFullName",
    value: function getValidFieldsFullName(maybePartialName) {
      var maybePartialNames = Array.isArray(maybePartialName) ? maybePartialName : [maybePartialName];
      return this.getValidFieldsName().filter(function (fullName) {
        return maybePartialNames.some(function (partialName) {
          return fullName === partialName || startsWith(fullName, partialName) && ['.', '['].indexOf(fullName[partialName.length]) >= 0;
        });
      });
    }
  }, {
    key: "getFieldValuePropValue",
    value: function getFieldValuePropValue(fieldMeta) {
      var name = fieldMeta.name,
          getValueProps = fieldMeta.getValueProps,
          valuePropName = fieldMeta.valuePropName;
      var field = this.getField(name);
      var fieldValue = 'value' in field ? field.value : fieldMeta.initialValue;

      if (getValueProps) {
        return getValueProps(fieldValue);
      }

      return _defineProperty({}, valuePropName, fieldValue);
    }
  }, {
    key: "getField",
    value: function getField(name) {
      return _objectSpread({}, this.fields[name], {
        name: name
      });
    }
  }, {
    key: "getNotCollectedFields",
    value: function getNotCollectedFields() {
      var _this4 = this;

      return this.getValidFieldsName().filter(function (name) {
        return !_this4.fields[name];
      }).map(function (name) {
        return {
          name: name,
          dirty: false,
          value: _this4.getFieldMeta(name).initialValue
        };
      }).reduce(function (acc, field) {
        return set(acc, field.name, createFormField(field));
      }, {});
    }
  }, {
    key: "getNestedAllFields",
    value: function getNestedAllFields() {
      var _this5 = this;

      return Object.keys(this.fields).reduce(function (acc, name) {
        return set(acc, name, createFormField(_this5.fields[name]));
      }, this.getNotCollectedFields());
    }
  }, {
    key: "getFieldMember",
    value: function getFieldMember(name, member) {
      return this.getField(name)[member];
    }
  }, {
    key: "getNestedFields",
    value: function getNestedFields(names, getter) {
      var fields = names || this.getValidFieldsName();
      return fields.reduce(function (acc, f) {
        return set(acc, f, getter(f));
      }, {});
    }
  }, {
    key: "getNestedField",
    value: function getNestedField(name, getter) {
      var fullNames = this.getValidFieldsFullName(name);

      if (fullNames.length === 0 || // Not registered
      fullNames.length === 1 && fullNames[0] === name // Name already is full name.
      ) {
          return getter(name);
        }

      var isArrayValue = fullNames[0][name.length] === '[';
      var suffixNameStartIndex = isArrayValue ? name.length : name.length + 1;
      return fullNames.reduce(function (acc, fullName) {
        return set(acc, fullName.slice(suffixNameStartIndex), getter(fullName));
      }, isArrayValue ? [] : {});
    }
  }, {
    key: "isValidNestedFieldName",
    // @private
    // BG: `a` and `a.b` cannot be use in the same form
    value: function isValidNestedFieldName(name) {
      var names = this.getAllFieldsName();
      return names.every(function (n) {
        return !partOf(n, name) && !partOf(name, n);
      });
    }
  }, {
    key: "clearField",
    value: function clearField(name) {
      delete this.fields[name];
      delete this.fieldsMeta[name];
    }
  }]);

  return FieldsStore;
}();

export default function createFieldsStore(fields) {
  return new FieldsStore(fields);
}