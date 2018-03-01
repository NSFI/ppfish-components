import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.less';
import { Input, Button } from 'antd';
import SuggestPanel from './Panel';
const InputGroup = Input.Group;

class Suggest extends Component {
  static propTypes = {
    style: PropTypes.object,
    focus: PropTypes.bool,
    value: PropTypes.string,
    onSearch: PropTypes.func,
    placeholder: PropTypes.string,
    onSelect: PropTypes.func,
    onChange: PropTypes.func,
    defaultVal: PropTypes.string.isRequired,

  };

  static defaultProps = {
    style: {
      width: 260,
    },
    placeholder: '股票代码/简拼',
    onSelect: () => {},
    onChange: () => {},
    defaultVal: '',
  };

  constructor(props) {
    super(props);
    let defaultState = {
      position: {
        left: 0,
        top: 0,
      },
      focus: false,
    };
    if ('defaultVal' in props) {
      defaultState.value = props.defaultVal;
    }else {
      defaultState.value = props.value;
    }
    this.state = defaultState;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFocusBlur = this.handleFocusBlur.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handlePanelSelect = this.handlePanelSelect.bind(this);
    this.setValue = this.setValue.bind(this);
    this.focus = this.focus.bind(this);
    this.lastValue = undefined;
  }

  // 输入框值跟随props.value变化
  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;
    if ('value' in nextProps) {
      if (value != this.lastValue) {
        this.setState({
          value: value.trim(),
        });
        this.lastValue = value;
      }
    }
  }

  // props.focus值变化,触发焦点变化
  componentWillUpdate(nextProps, nextState) {
    if ('focus' in nextProps && nextProps.focus) {
      this.focus();
    }
  }

  setValue(val) {
    let input = this.refs.input;
    input = input.input;
    input.value = val;
  }

  select() {
    let input = this.refs.input;
    input = input.input;
    input.select();
  }

  focus() {
    let input = this.refs.input;
    input = input.input;
    input.focus();
  }

  getPosition() {
    const doc = document.documentElement;
    const offsetLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    const offsetTop = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
    const rect = this.refs.suggestInput.getBoundingClientRect();
    return {
      left: rect.left + offsetLeft + 1,
      top: rect.height + rect.top + offsetTop + 5,
    };

  }

  handleInputChange(e) {
    const { onChange } = this.props;
    let newVal = e.target.value;
    this.setState({
      value: newVal,
    });
    if (!this.panelContainer) {
      this.panelContainer = document.createElement('div');
      document.body.appendChild(this.panelContainer);
      this.setState({
        position: this.getPosition(),
      });
    }
    // 搜索词变化时,强制显示搜索列表
    let panel = this.panelContainer.querySelector('.suggest-panel');
    if (panel) {
      panel.style.display = 'block';
    }
    onChange(newVal);
  }

  handleClick() {
    this.setState({
      focus: true,
    });
  }

  handleFocusBlur(e) {
    const focus = e.target === document.activeElement;
    if (focus) {
      this.select();
    }
    setTimeout(()=>{
      this.setState({
        focus: focus,
      });
      if (focus) {
        this.setState({
          position: this.getPosition(),
        });
      }
    }, 200);
  }

  handleSearch() {
    const { onSearch } = this.props;
    this.refs.suggestPanel.handleSearch();
    if (typeof onSearch == 'function') {
      onSearch(this.state.value);
    }
  }

  handleKeyUp(e) {
    this.refs.suggestPanel.handleKeyUp(e);
  }

  // 搜索结果列表选择事件
  handlePanelSelect(e, selectObj) {
    const { onSelect } = this.props;
    this.setState({
      focus: false,
    });
    onSelect(selectObj);
  }

  render() {
    const { style, placeholder } = this.props;
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!this.state.value.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'ant-search-input-focus': this.state.focus,
    });
    return (
      <div className="m-suggest-wrapper" style={style} ref="suggestInput">
        <div className="ant-search-input-wrapper">
          <InputGroup className={searchCls}>
            <Input
              ref="input"
              placeholder={placeholder}
              value={this.state.value}
              onChange={this.handleInputChange}
              onClick={this.handleClick}
              onFocus={this.handleFocusBlur}
              onBlur={this.handleFocusBlur}
              onPressEnter={this.handleSearch}
              onKeyUp={this.handleKeyUp}
            />
            <div className="ant-input-group-wrap">
              <Button icon="search" className={btnCls} onClick={this.handleSearch} />
            </div>
          </InputGroup>
        </div>
        <SuggestPanel
          ref="suggestPanel"
          panelContainer={this.panelContainer}
          value={this.state.value}
          position={this.state.position}
          visibility={this.state.focus}
          onSelect={this.handlePanelSelect}
        />
      </div>
    );
  }
}

export default Suggest;
