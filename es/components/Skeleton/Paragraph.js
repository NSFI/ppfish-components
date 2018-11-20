import * as React from 'react';
import classNames from 'classnames';
class Paragraph extends React.Component {
    getWidth(index) {
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
        for (let i = 0; i < rows; i++) {
            rowList.push(React.createElement("li", { key: 'row_list_' + i, style: { width: this.getWidth(i) } }));
        }
        return (React.createElement("ul", { className: classNames(prefixCls, className), style: style }, rowList));
    }
}
Paragraph.defaultProps = {
    prefixCls: 'fishd-skeleton-paragraph',
};
export default Paragraph;
