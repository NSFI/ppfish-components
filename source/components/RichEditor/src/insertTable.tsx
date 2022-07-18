import React, { Component } from 'react';
import classNames from 'classnames';
import { LocaleProperties } from '../../Locale';

const preClass = 'ql-table-popover';

interface IProps {
  chooseItemHandle: (row: number, col: number) => void;
  visible: boolean;
  locale: LocaleProperties['RichEditor'];
}

interface IState {
  activeRow: number;
  activeCol: number;
}

class InsertTable extends Component<IProps, IState> {
  cellClass = `${preClass}-cell`;
  state = {
    activeRow: 0,
    activeCol: 0,
  };
  private cellArr: undefined[][];

  constructor(props) {
    super(props);
    this.cellArr = [...new Array(9)].map(item => {
      return [...new Array(9)];
    });
  }

  mouseCallback = ev => {
    const target = ev.target;
    if (target.classList.contains(this.cellClass)) {
      const position = target.dataset.position;
      if (position) {
        const tuple: string[] = position.split(',');
        this.setState({
          activeRow: Number(tuple[0]),
          activeCol: Number(tuple[1]),
        });
      }
    }
  };

  mouseoverHandle = ev => {
    this.mouseCallback(ev);
  };

  clickHandle = ev => {
    const target = ev.target;
    if (target.classList.contains(this.cellClass)) {
      const position = target.dataset.position;
      if (position) {
        const tuple: string[] = position.split(',');
        this.props.chooseItemHandle(Number(tuple[0]) + 1, Number(tuple[1]) + 1);
      }
    }
  };

  static getDerivedStateFromProps = (nextProps: Readonly<IProps>) => {
    if (!nextProps.visible) {
      return {
        activeRow: 0,
        activeCol: 0,
      };
    }
    return null;
  };

  render() {
    const { activeCol, activeRow } = this.state;
    const { locale } = this.props;
    return (
      <div className={preClass}>
        <div className={`${preClass}-header`}>
          <span>{locale.tableDesc}</span>
          <span>
            {activeCol + 1}×{activeRow + 1}
          </span>
        </div>
        <div
          className={`${preClass}-box`}
          onMouseMove={this.mouseoverHandle}
          onClick={this.clickHandle}
        >
          {this.cellArr.map((row, rowIndex) => {
            return row.map((col, colIndex) => {
              return (
                <div
                  data-position={`${rowIndex},${colIndex}`}
                  className={classNames(this.cellClass, {
                    active: rowIndex <= activeRow && colIndex <= activeCol,
                  })}
                  key={`${rowIndex}${colIndex}`}
                />
              );
            });
          })}
        </div>
      </div>
    );
  }
}

export default InsertTable;
