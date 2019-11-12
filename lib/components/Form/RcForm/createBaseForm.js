"use strict";

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.object.assign");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

var _react = _interopRequireDefault(require("react"));

var _createReactClass = _interopRequireDefault(require("create-react-class"));

var _asyncValidator = _interopRequireDefault(require("async-validator"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _warning = _interopRequireDefault(require("warning"));

var _get = _interopRequireDefault(require("lodash/get"));

var _set = _interopRequireDefault(require("lodash/set"));

var _createFieldsStore = _interopRequireDefault(require("./createFieldsStore"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var DEFAULT_TRIGGER = 'onChange';

function createBaseForm(option, mixins) {
  if (option === void 0) {
    option = {};
  }

  if (mixins === void 0) {
    mixins = [];
  }

  var _option = option,
      validateMessages = _option.validateMessages,
      onFieldsChange = _option.onFieldsChange,
      onValuesChange = _option.onValuesChange,
      _option$mapProps = _option.mapProps,
      mapProps = _option$mapProps === void 0 ? _utils.identity : _option$mapProps,
      mapPropsToFields = _option.mapPropsToFields,
      fieldNameProp = _option.fieldNameProp,
      fieldMetaProp = _option.fieldMetaProp,
      fieldDataProp = _option.fieldDataProp,
      _option$formPropName = _option.formPropName,
      formPropName = _option$formPropName === void 0 ? 'form' : _option$formPropName,
      withRef = _option.withRef;

  var staticGetDerivedStateFromProps = function staticGetDerivedStateFromProps(nextProps, prevState) {
    if (mapPropsToFields) {
      prevState.__fieldsStore.updateFields(mapPropsToFields(nextProps));
    }

    return null;
  };

  return function decorate(WrappedComponent) {
    var Form = (0, _createReactClass.default)({
      displayName: "Form",
      mixins: mixins,
      getInitialState: function getInitialState() {
        var _this = this;

        var fields = mapPropsToFields && mapPropsToFields(this.props);
        this.fieldsStore = (0, _createFieldsStore.default)(fields || {});
        this.instances = {};
        this.cachedBind = {};
        this.clearedFieldMetaCache = {}; // HACK: https://github.com/ant-design/ant-design/issues/6406

        ['getFieldsValue', 'getFieldValue', 'setFieldsInitialValue', 'getFieldsError', 'getFieldError', 'isFieldValidating', 'isFieldsValidating', 'isFieldsTouched', 'isFieldTouched'].forEach(function (key) {
          return _this[key] = function () {
            var _this$fieldsStore;

            if (process.env.NODE_ENV !== 'production') {
              (0, _warning.default)(false, 'you should not use `ref` on enhanced form, please use `wrappedComponentRef`. See: ' + 'https://github.com/react-component/form#note-use-wrappedcomponentref-instead-of-withref-after-rc-form140');
            }

            return (_this$fieldsStore = _this.fieldsStore)[key].apply(_this$fieldsStore, arguments);
          };
        });
        return {
          __fieldsStore: this.fieldsStore,
          submitting: false
        };
      },
      onCollectCommon: function onCollectCommon(name, action, args) {
        var fieldMeta = this.fieldsStore.getFieldMeta(name);

        if (fieldMeta[action]) {
          fieldMeta[action].apply(fieldMeta, args);
        } else if (fieldMeta.originalProps && fieldMeta.originalProps[action]) {
          var _fieldMeta$originalPr;

          (_fieldMeta$originalPr = fieldMeta.originalProps)[action].apply(_fieldMeta$originalPr, args);
        }

        var value = fieldMeta.getValueFromEvent ? fieldMeta.getValueFromEvent.apply(fieldMeta, args) : _utils.getValueFromEvent.apply(void 0, args);

        if (onValuesChange && value !== this.fieldsStore.getFieldValue(name)) {
          var valuesAll = this.fieldsStore.getAllValues();
          var valuesAllSet = {};
          valuesAll[name] = value;
          Object.keys(valuesAll).forEach(function (key) {
            return (0, _set.default)(valuesAllSet, key, valuesAll[key]);
          });
          onValuesChange(this.props, (0, _set.default)({}, name, value), valuesAllSet);
        }

        var field = this.fieldsStore.getField(name);
        return {
          name: name,
          field: Object.assign({}, field, {
            value: value,
            touched: true
          }),
          fieldMeta: fieldMeta
        };
      },
      onCollect: function onCollect(name_, action) {
        var _this$setFields;

        for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          args[_key - 2] = arguments[_key];
        }

        var _this$onCollectCommon = this.onCollectCommon(name_, action, args),
            name = _this$onCollectCommon.name,
            field = _this$onCollectCommon.field,
            fieldMeta = _this$onCollectCommon.fieldMeta;

        var validate = fieldMeta.validate;
        var newField = Object.assign({}, field, {
          dirty: (0, _utils.hasRules)(validate)
        });
        this.setFields((_this$setFields = {}, _this$setFields[name] = newField, _this$setFields));
      },
      onCollectValidate: function onCollectValidate(name_, action) {
        for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        var _this$onCollectCommon2 = this.onCollectCommon(name_, action, args),
            field = _this$onCollectCommon2.field,
            fieldMeta = _this$onCollectCommon2.fieldMeta;

        var newField = Object.assign({}, field, {
          dirty: true
        });
        this.validateFieldsInternal([newField], {
          action: action,
          options: {
            firstFields: !!fieldMeta.validateFirst
          }
        });
      },
      getCacheBind: function getCacheBind(name, action, fn) {
        if (!this.cachedBind[name]) {
          this.cachedBind[name] = {};
        }

        var cache = this.cachedBind[name];

        if (!cache[action]) {
          cache[action] = fn.bind(this, name, action);
        }

        return cache[action];
      },
      recoverClearedField: function recoverClearedField(name) {
        if (this.clearedFieldMetaCache[name]) {
          var _this$fieldsStore$set;

          this.fieldsStore.setFields((_this$fieldsStore$set = {}, _this$fieldsStore$set[name] = this.clearedFieldMetaCache[name].field, _this$fieldsStore$set));
          this.fieldsStore.setFieldMeta(name, this.clearedFieldMetaCache[name].meta);
          delete this.clearedFieldMetaCache[name];
        }
      },
      getFieldDecorator: function getFieldDecorator(name, fieldOption) {
        var _this2 = this;

        var props = this.getFieldProps(name, fieldOption);
        return function (fieldElem) {
          var fieldMeta = _this2.fieldsStore.getFieldMeta(name);

          var originalProps = fieldElem.props;

          if (process.env.NODE_ENV !== 'production') {
            var valuePropName = fieldMeta.valuePropName;
            (0, _warning.default)(!(valuePropName in originalProps), "`getFieldDecorator` will override `" + valuePropName + "`, " + ("so please don't set `" + valuePropName + "` directly ") + "and use `setFieldsValue` to set it.");
            var defaultValuePropName = "default" + valuePropName[0].toUpperCase() + valuePropName.slice(1);
            (0, _warning.default)(!(defaultValuePropName in originalProps), "`" + defaultValuePropName + "` is invalid " + ("for `getFieldDecorator` will set `" + valuePropName + "`,") + " please use `option.initialValue` instead.");
          }

          fieldMeta.originalProps = originalProps;
          fieldMeta.ref = fieldElem.ref;
          return _react.default.cloneElement(fieldElem, Object.assign({}, props, {}, _this2.fieldsStore.getFieldValuePropValue(fieldMeta)));
        };
      },
      getFieldProps: function getFieldProps(name, usersFieldOption) {
        var _this3 = this;

        if (usersFieldOption === void 0) {
          usersFieldOption = {};
        }

        if (!name) {
          throw new Error('Must call `getFieldProps` with valid name string!');
        }

        if (process.env.NODE_ENV !== 'production') {
          (0, _warning.default)(this.fieldsStore.isValidNestedFieldName(name), 'One field name cannot be part of another, e.g. `a` and `a.b`.');
          (0, _warning.default)(!('exclusive' in usersFieldOption), '`option.exclusive` of `getFieldProps`|`getFieldDecorator` had been remove.');
        }

        delete this.clearedFieldMetaCache[name];
        var fieldOption = Object.assign({
          name: name,
          trigger: DEFAULT_TRIGGER,
          valuePropName: 'value',
          validate: []
        }, usersFieldOption);
        var rules = fieldOption.rules,
            trigger = fieldOption.trigger,
            _fieldOption$validate = fieldOption.validateTrigger,
            validateTrigger = _fieldOption$validate === void 0 ? trigger : _fieldOption$validate,
            validate = fieldOption.validate;
        var fieldMeta = this.fieldsStore.getFieldMeta(name);

        if ('initialValue' in fieldOption) {
          fieldMeta.initialValue = fieldOption.initialValue;
        }

        var inputProps = Object.assign({}, this.fieldsStore.getFieldValuePropValue(fieldOption), {
          ref: this.getCacheBind(name, name + "__ref", this.saveRef)
        });

        if (fieldNameProp) {
          inputProps[fieldNameProp] = name;
        }

        var validateRules = (0, _utils.normalizeValidateRules)(validate, rules, validateTrigger);
        var validateTriggers = (0, _utils.getValidateTriggers)(validateRules);
        validateTriggers.forEach(function (action) {
          if (inputProps[action]) return;
          inputProps[action] = _this3.getCacheBind(name, action, _this3.onCollectValidate);
        }); // make sure that the value will be collect

        if (trigger && validateTriggers.indexOf(trigger) === -1) {
          inputProps[trigger] = this.getCacheBind(name, trigger, this.onCollect);
        }

        var meta = Object.assign({}, fieldMeta, {}, fieldOption, {
          validate: validateRules
        });
        this.fieldsStore.setFieldMeta(name, meta);

        if (fieldMetaProp) {
          inputProps[fieldMetaProp] = meta;
        }

        if (fieldDataProp) {
          inputProps[fieldDataProp] = this.fieldsStore.getField(name);
        }

        return inputProps;
      },
      getFieldInstance: function getFieldInstance(name) {
        return this.instances[name];
      },
      getRules: function getRules(fieldMeta, action) {
        var actionRules = fieldMeta.validate.filter(function (item) {
          return !action || item.trigger.indexOf(action) >= 0;
        }).map(function (item) {
          return item.rules;
        });
        return (0, _utils.flattenArray)(actionRules);
      },
      setFields: function setFields(maybeNestedFields, callback) {
        var _this4 = this;

        var fields = this.fieldsStore.flattenRegisteredFields(maybeNestedFields);
        this.fieldsStore.setFields(fields);

        if (onFieldsChange) {
          var changedFields = Object.keys(fields).reduce(function (acc, name) {
            return (0, _set.default)(acc, name, _this4.fieldsStore.getField(name));
          }, {});
          onFieldsChange(this.props, changedFields, this.fieldsStore.getNestedAllFields());
        }

        this.forceUpdate(callback);
      },
      resetFields: function resetFields(ns) {
        var _this5 = this;

        var newFields = this.fieldsStore.resetFields(ns);

        if (Object.keys(newFields).length > 0) {
          this.setFields(newFields);
        }

        if (ns) {
          var names = Array.isArray(ns) ? ns : [ns];
          names.forEach(function (name) {
            return delete _this5.clearedFieldMetaCache[name];
          });
        } else {
          this.clearedFieldMetaCache = {};
        }
      },
      setFieldsValue: function setFieldsValue(changedValues, callback) {
        var fieldsMeta = this.fieldsStore.fieldsMeta;
        var values = this.fieldsStore.flattenRegisteredFields(changedValues);
        var newFields = Object.keys(values).reduce(function (acc, name) {
          var isRegistered = fieldsMeta[name];

          if (process.env.NODE_ENV !== 'production') {
            (0, _warning.default)(isRegistered, 'Cannot use `setFieldsValue` until ' + 'you use `getFieldDecorator` or `getFieldProps` to register it.');
          }

          if (isRegistered) {
            var value = values[name];
            acc[name] = {
              value: value
            };
          }

          return acc;
        }, {});
        this.setFields(newFields, callback);

        if (onValuesChange) {
          var allValues = this.fieldsStore.getAllValues();
          onValuesChange(this.props, changedValues, allValues);
        }
      },
      saveRef: function saveRef(name, _, component) {
        if (!component) {
          // after destroy, delete data
          this.clearedFieldMetaCache[name] = {
            field: this.fieldsStore.getField(name),
            meta: this.fieldsStore.getFieldMeta(name)
          };
          this.fieldsStore.clearField(name);
          delete this.instances[name];
          delete this.cachedBind[name];
          return;
        }

        this.recoverClearedField(name);
        var fieldMeta = this.fieldsStore.getFieldMeta(name);

        if (fieldMeta) {
          var ref = fieldMeta.ref;

          if (ref) {
            if (typeof ref === 'string') {
              throw new Error("can not set ref string for " + name);
            }

            ref(component);
          }
        }

        this.instances[name] = component;
      },
      validateFieldsInternal: function validateFieldsInternal(fields, _ref, callback) {
        var _this6 = this;

        var fieldNames = _ref.fieldNames,
            action = _ref.action,
            _ref$options = _ref.options,
            options = _ref$options === void 0 ? {} : _ref$options;
        var allRules = {};
        var allValues = {};
        var allFields = {};
        var alreadyErrors = {};
        fields.forEach(function (field) {
          var name = field.name;

          if (options.force !== true && field.dirty === false) {
            if (field.errors) {
              (0, _set.default)(alreadyErrors, name, {
                errors: field.errors
              });
            }

            return;
          }

          var fieldMeta = _this6.fieldsStore.getFieldMeta(name);

          var newField = Object.assign({}, field);
          newField.errors = undefined;
          newField.validating = true;
          newField.dirty = true;
          allRules[name] = _this6.getRules(fieldMeta, action);
          allValues[name] = newField.value;
          allFields[name] = newField;
        });
        this.setFields(allFields); // in case normalize

        Object.keys(allValues).forEach(function (f) {
          allValues[f] = _this6.fieldsStore.getFieldValue(f);
        });

        if (callback && (0, _utils.isEmptyObject)(allFields)) {
          callback((0, _utils.isEmptyObject)(alreadyErrors) ? null : alreadyErrors, this.fieldsStore.getFieldsValue(fieldNames));
          return;
        }

        var validator = new _asyncValidator.default(allRules);

        if (validateMessages) {
          validator.messages(validateMessages);
        }

        validator.validate(allValues, options, function (errors) {
          var errorsGroup = Object.assign({}, alreadyErrors);

          if (errors && errors.length) {
            errors.forEach(function (e) {
              var fieldName = e.field;
              var field = (0, _get.default)(errorsGroup, fieldName);

              if (typeof field !== 'object' || Array.isArray(field)) {
                (0, _set.default)(errorsGroup, fieldName, {
                  errors: []
                });
              }

              var fieldErrors = (0, _get.default)(errorsGroup, fieldName.concat('.errors'));
              fieldErrors.push(e);
            });
          }

          var expired = [];
          var nowAllFields = {};
          Object.keys(allRules).forEach(function (name) {
            var fieldErrors = (0, _get.default)(errorsGroup, name);

            var nowField = _this6.fieldsStore.getField(name); // avoid concurrency problems


            if (nowField.value !== allValues[name]) {
              expired.push({
                name: name
              });
            } else {
              nowField.errors = fieldErrors && fieldErrors.errors;
              nowField.value = allValues[name];
              nowField.validating = false;
              nowField.dirty = false;
              nowAllFields[name] = nowField;
            }
          });

          _this6.setFields(nowAllFields);

          if (callback) {
            if (expired.length) {
              expired.forEach(function (_ref2) {
                var name = _ref2.name;
                var fieldErrors = [{
                  message: name + " need to revalidate",
                  field: name
                }];
                (0, _set.default)(errorsGroup, name, {
                  expired: true,
                  errors: fieldErrors
                });
              });
            }

            callback((0, _utils.isEmptyObject)(errorsGroup) ? null : errorsGroup, _this6.fieldsStore.getFieldsValue(fieldNames));
          }
        });
      },
      validateFields: function validateFields(ns, opt, cb) {
        var _this7 = this;

        var _getParams = (0, _utils.getParams)(ns, opt, cb),
            names = _getParams.names,
            callback = _getParams.callback,
            options = _getParams.options;

        var fieldNames = names ? this.fieldsStore.getValidFieldsFullName(names) : this.fieldsStore.getValidFieldsName();
        var fields = fieldNames.filter(function (name) {
          var fieldMeta = _this7.fieldsStore.getFieldMeta(name);

          return (0, _utils.hasRules)(fieldMeta.validate);
        }).map(function (name) {
          var field = _this7.fieldsStore.getField(name);

          field.value = _this7.fieldsStore.getFieldValue(name);
          return field;
        });

        if (!fields.length) {
          if (callback) {
            callback(null, this.fieldsStore.getFieldsValue(fieldNames));
          }

          return;
        }

        if (!('firstFields' in options)) {
          options.firstFields = fieldNames.filter(function (name) {
            var fieldMeta = _this7.fieldsStore.getFieldMeta(name);

            return !!fieldMeta.validateFirst;
          });
        }

        this.validateFieldsInternal(fields, {
          fieldNames: fieldNames,
          options: options
        }, callback);
      },
      isSubmitting: function isSubmitting() {
        if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
          (0, _warning.default)(false, '`isSubmitting` is deprecated. ' + 'Actually, it\'s more convenient to handle submitting status by yourself.');
        }

        return this.state.submitting;
      },
      submit: function submit(callback) {
        var _this8 = this;

        if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
          (0, _warning.default)(false, '`submit` is deprecated.' + 'Actually, it\'s more convenient to handle submitting status by yourself.');
        }

        var fn = function fn() {
          _this8.setState({
            submitting: false
          });
        };

        this.setState({
          submitting: true
        });
        callback(fn);
      },
      render: function render() {
        var _formProps;

        var _this$props = this.props,
            wrappedComponentRef = _this$props.wrappedComponentRef,
            restProps = _objectWithoutPropertiesLoose(_this$props, ["wrappedComponentRef"]);

        var formProps = (_formProps = {}, _formProps[formPropName] = this.getForm(), _formProps);

        if (withRef) {
          if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
            (0, _warning.default)(false, '`withRef` is deprecated, please use `wrappedComponentRef` instead. See: ' + 'https://github.com/react-component/form#note-use-wrappedcomponentref-instead-of-withref-after-rc-form140');
          }

          formProps.ref = 'wrappedComponent';
        } else if (wrappedComponentRef) {
          formProps.ref = wrappedComponentRef;
        }

        var props = mapProps.call(this, Object.assign({}, formProps, {}, restProps));
        return _react.default.createElement(WrappedComponent, props);
      }
    });
    Form.getDerivedStateFromProps = staticGetDerivedStateFromProps;
    (0, _reactLifecyclesCompat.polyfill)(Form);
    return (0, _utils.argumentContainer)(Form, WrappedComponent);
  };
}

var _default = createBaseForm;
exports.default = _default;