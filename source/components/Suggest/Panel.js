import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import axios from 'axios';
import classNames from 'classnames';

class Panel extends Component {
  static propTypes = {
    value: PropTypes.string,
    panelContainer: PropTypes.object,
    dataCount: PropTypes.number,
    position: PropTypes.object,
    visibility: PropTypes.bool,
    onSelect: PropTypes.func,
  };

  static defaultProps = {
    dataCount: 10,
    visibility: true,
    onSelect: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      selectedIndex: -1,
    };
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.tickHandle = null;
  }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;
    // 股票查询范围(剔除版块)
    const finance_mic = 'CCFX.FF,SS.ESA,SS.MRI,SS.EM.SF,SS.EM.ETF,SZ.ESA,SZ.MRI,SZ.EM.SF,SZ.EM.ETF';
    // 股票查询范围(含版块)
    //const finance_mic = 'CCFX.FF,SS.ESA,SS.MRI,SS.EM.SF,SS.EM.ETF,SZ.ESA,SZ.MRI,SZ.EM.SF,SZ.EM.ETF,XBHS';
    // 可交易股票范围
    //const finance_mic = 'SS.ESA,SS.EM.SF,SS.EM.ETF,SZ.ESA,SZ.EM.SF,SZ.EM.ETF';
    const TICK_TIME = 400;
    // 输入中文不发请求
    const reg = /^[\d\w]+$/;
    if (value && reg.test(value)) {
      if (this.tickHandle) {
        clearTimeout(this.tickHandle);
      }
      this.tickHandle = setTimeout(() => {
        axios({
          url: `http://www.gusoul.com/tsp/hsoi/quote/v1/wizard?en_finance_mic=${finance_mic}&data_count=10&prod_code=${value}`,
          method: 'GET',
        })
          .then(json => {
            const data = json.data;
            if (data) {
              this.setState({
                list: data.data,
                selectedIndex: -1,
              });
            }
          });
      }, TICK_TIME);
    }
  }

  componentDidUpdate() {
    const { panelContainer } = this.props;
    if (panelContainer) {
      ReactDOM.render(this.getPanel(), panelContainer);
    }
  }

  componentWillUnmount() {
    const { panelContainer } = this.props;
    if (panelContainer) {
      ReactDOM.unmountComponentAtNode(this.panelContainer);
    }
  }

  handleKeyUp(e) {
    const keycode = e.which || e.keyCode;
    const { selectedIndex } = this.state;
    const len = this.state.list.length;
    // 往下翻
    if (keycode == 40) {
      this.setState({
        selectedIndex: selectedIndex + 1 >= len ? len - 1 : selectedIndex + 1
      });
    }
    // 往上翻
    if (keycode == 38) {
      this.setState({
        selectedIndex: selectedIndex - 1 <= 0 ? 0 : selectedIndex - 1
      });
    }
    // Enter
    if (keycode == 13) {
      this.handleSearch();
    }
    e.preventDefault();
  }

  handleSearch(e, index) {
    const { onSelect } = this.props;
    let selectedIndex;
    // 鼠标点击
    if (e && e.currentTarget) {
      let clickIndex = e.currentTarget.getAttribute('tabindex');
      this.setState({
        selectedIndex: selectedIndex = clickIndex - 1
      });
    // 按下键盘Enter
    }else {
      if (typeof index != 'undefined') {
        this.setState({
          selectedIndex: index,
        });
        selectedIndex = index;
      }else {
        selectedIndex = this.state.selectedIndex;
      }
    }
    if (selectedIndex == -1) {
      selectedIndex = 0;
    }
    let selectObj = this.state.list[selectedIndex];
    onSelect(e, selectObj);
  }

  getPanel() {
    const { value, position } = this.props;
    const getItems = () => {
      if (!value) return null;
      const panelItem = this.state.list.map((item, i) => {
        const selectedCls = classNames({
          'clearfix': true,
          'm-suggest-panel-item': true,
          'selected': i == this.state.selectedIndex,
        });
        return (
          <li className={selectedCls} key={item.prod_code} tabIndex={i+1} onClick={this.handleSearch}>
            <div className="text">{item.prod_name}</div>
            <div className="code">{item.prod_code}</div>
          </li>
        );
      });
      return (
        <ul className="m-suggest-panel-items">
          {panelItem}
        </ul>
      );
    };
    const panelItems = getItems();
    const style = Object.assign({}, position, {display: this.props.visibility ? 'block' : 'none'});
    return (
      <div className="m-suggest-panel" style={style} onKeyUp={this.handleKeyUp}>
        {panelItems}
      </div>
    );
  }

  render() {
    return null;
  }
}

export default Panel;

