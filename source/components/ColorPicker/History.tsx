import * as React from 'react';
import PropTypes from 'prop-types';
import Color from './helpers/color';
import { PickedColor } from './Board';

interface HistoryProps {
  colorHistory: PickedColor[];
  maxHistory: number;
  onHistoryClick: (node?: any) => void;
  prefixCls: string;
}

export default class History extends React.Component<HistoryProps> {
  static propTypes = {
    colorHistory: PropTypes.array,
    maxHistory: PropTypes.number,
    onHistoryClick: PropTypes.func,
    prefixCls: PropTypes.string,
  };

  render() {
    const { prefixCls, colorHistory, maxHistory } = this.props;

    let renderColors = [...colorHistory];
    if (colorHistory.length < maxHistory) {
      renderColors = [
        ...renderColors,
        ...new Array(maxHistory - colorHistory.length),
      ];
    }
    return (
      <div className={`${prefixCls}-history`}>
        {renderColors.map((obj, key) => {
          if (obj) {
            let props = {};
            if (typeof obj === 'object') {
              const [r, g, b] = new Color(obj.color).RGB;
              const RGBA = [r, g, b];

              RGBA.push(obj.alpha / 100);

              props = {
                key,
                onClick: () => this.props.onHistoryClick(obj),
                className: `${prefixCls}-history-color`,
                style: { background: `rgba(${RGBA.join(',')})` },
              };
            } else if (typeof obj === 'string') {
              props = {
                key,
                onClick: () =>
                  this.props.onHistoryClick({ color: obj, alpha: 100 }),
                className: `${prefixCls}-history-color`,
                style: { background: obj },
              };
            }
            return <span {...props} />;
          } else {
            const props = {
              key,
              className: `${prefixCls}-history-color`,
            };
            return <span {...props} />;
          }
        })}
      </div>
    );
  }
}
