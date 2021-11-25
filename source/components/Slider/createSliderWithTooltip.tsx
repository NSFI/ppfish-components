import React from 'react';
import Tooltip, { TooltipProps } from '../Tooltip/index';
import Handle from './RcHandle';

interface WrapperProps {
  handleStyle: React.CSSProperties[] | React.CSSProperties;
  tipProps: TooltipProps;
}

interface WrapperStates {
  visibles: {
    [index: number]: boolean;
  };
}

export default function createSliderWithTooltip(Component) {
  return class ComponentWrapper extends React.Component<WrapperProps, WrapperStates> {
    static defaultProps = {
      handleStyle: [{}],
      tipProps: {},
    };

    constructor(props) {
      super(props);
      this.state = { visibles: {} };
    }

    handleTooltipVisibleChange = (index, visible) => {
      this.setState(prevState => {
        return {
          visibles: {
            ...prevState.visibles,
            [index]: visible,
          },
        };
      });
    };

    handleWithTooltip = ({ value, dragging, index, disabled, ...restProps }) => {
      const { tipProps, handleStyle } = this.props;

      const {
        prefixCls = 'rc-slider-tooltip',
        placement = 'top',
        visible = false,
        ...restTooltipProps
      } = tipProps;

      let handleStyleWithIndex;
      if (Array.isArray(handleStyle)) {
        handleStyleWithIndex = handleStyle[index] || handleStyle[0];
      } else {
        handleStyleWithIndex = handleStyle;
      }

      return (
        <Tooltip
          {...restTooltipProps}
          prefixCls={prefixCls}
          placement={placement}
          visible={(!disabled && (this.state.visibles[index] || dragging)) || visible}
          key={index}
        >
          <Handle
            {...restProps}
            style={{
              ...handleStyleWithIndex,
            }}
            value={value}
            onMouseEnter={() => this.handleTooltipVisibleChange(index, true)}
            onMouseLeave={() => this.handleTooltipVisibleChange(index, false)}
          />
        </Tooltip>
      );
    };

    render() {
      return <Component {...this.props} handle={this.handleWithTooltip} />;
    }
  };
}
