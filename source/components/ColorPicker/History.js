import React from 'react';
import PropTypes from 'prop-types';
import Color from "./helpers/color";
import constants from './constants';

export default class History extends React.Component {
  render() {
    const {prefixCls, colors} = this.props;
    let renderColors = [...colors];
    if (colors.length < constants.maxHistory) {
      renderColors = [...renderColors, ...new Array(constants.maxHistory - colors.length)];
    }
    return (
      <div className={`${prefixCls}-history`}>
        {renderColors.map((obj, key) => {
          if (obj && obj.color && obj.alpha) {
            const [r, g, b] = new Color(obj.color).RGB;
            const RGBA = [r, g, b];

            RGBA.push(obj.alpha / 100);

            const props = {
              key,
              onClick: () => this.props.onHistoryClick(obj),
              className: `${prefixCls}-history-color`,
              style: {background: `rgba(${RGBA.join(',')})`}
            };
            return (<span {...props}/>);
          } else {
            const props = {
              key,
              className: `${prefixCls}-history-color`,
            };
            return (<span {...props}/>);
          }
        })}
      </div>
    );
  }
}

History.propTypes = {
  prefixCls: PropTypes.string,
  colors: PropTypes.array,
  onHistoryClick: PropTypes.func
};
