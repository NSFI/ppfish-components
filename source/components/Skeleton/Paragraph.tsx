import * as React from 'react';
import classNames from 'classnames';

type widthUnit = number | string;

export interface SkeletonParagraphProps {
  prefixCls?: string;
  className?: string;
  style?: object;
  width?: widthUnit | Array<widthUnit>;
  rows?: number;
}

class Paragraph extends React.Component<SkeletonParagraphProps, {}> {
  static defaultProps: Partial<SkeletonParagraphProps> = {
    prefixCls: 'fishd-skeleton-paragraph',
  };

  getWidth(index: number) {
    const { width, rows = 2 } = this.props;
    if (Array.isArray(width)) {
      return width[index];
    }
    // last paragraph
    if (rows - 1 === index) {
      return width;
    }
    return undefined;
  }

  render() {
    const { prefixCls, className, style, rows } = this.props;
    let rowList = [];
    for (let i=0; i<rows; i++) {
      rowList.push(
        <li key={'row_list_' + i} style={{ width: this.getWidth(i) }} />
      );
    }
    return (
      <ul
        className={classNames(prefixCls, className)}
        style={style}
      >
        {rowList}
      </ul>
    );
  }
}

export default Paragraph;
