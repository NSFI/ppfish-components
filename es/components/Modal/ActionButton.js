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
import * as ReactDOM from 'react-dom';
import Button from '../Button';

var ActionButton =
/** @class */
function (_super) {
  __extends(ActionButton, _super);

  function ActionButton(props) {
    var _this = _super.call(this, props) || this;

    _this.onClick = function () {
      var _a = _this.props,
          actionFn = _a.actionFn,
          closeModal = _a.closeModal;

      if (actionFn) {
        var ret = void 0;

        if (actionFn.length) {
          ret = actionFn(closeModal);
        } else {
          ret = actionFn();

          if (!ret) {
            closeModal();
          }
        }

        if (ret && ret.then) {
          _this.setState({
            loading: true
          });

          ret.then(function () {
            var args = [];

            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            } // It's unnecessary to set loading=false, for the Modal will be unmounted after close.
            // this.setState({ loading: false });


            closeModal.apply(void 0, args);
          }, function () {
            // See: https://github.com/ant-design/ant-design/issues/6183
            _this.setState({
              loading: false
            });
          });
        }
      } else {
        closeModal();
      }
    };

    _this.state = {
      loading: false
    };
    return _this;
  }

  ActionButton.prototype.componentDidMount = function () {
    if (this.props.autoFocus) {
      var $this_1 = ReactDOM.findDOMNode(this);
      this.timeoutId = setTimeout(function () {
        return $this_1.focus();
      });
    }
  };

  ActionButton.prototype.componentWillUnmount = function () {
    clearTimeout(this.timeoutId);
  };

  ActionButton.prototype.render = function () {
    var _a = this.props,
        type = _a.type,
        children = _a.children;
    var loading = this.state.loading;
    return React.createElement(Button, {
      type: type,
      onClick: this.onClick,
      loading: loading
    }, children);
  };

  return ActionButton;
}(React.Component);

export default ActionButton;