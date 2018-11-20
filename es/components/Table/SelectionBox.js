var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import * as React from 'react';
import Checkbox from '../Checkbox';
import Radio from '../Radio';
export default class SelectionBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: this.getCheckState(props),
        };
    }
    componentDidMount() {
        this.subscribe();
    }
    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }
    subscribe() {
        const { store } = this.props;
        this.unsubscribe = store.subscribe(() => {
            const checked = this.getCheckState(this.props);
            this.setState({ checked });
        });
    }
    getCheckState(props) {
        const { store, defaultSelection, rowIndex } = props;
        let checked = false;
        if (store.getState().selectionDirty) {
            checked = store.getState().selectedRowKeys.indexOf(rowIndex) >= 0;
        }
        else {
            checked = (store.getState().selectedRowKeys.indexOf(rowIndex) >= 0 ||
                defaultSelection.indexOf(rowIndex) >= 0);
        }
        return checked;
    }
    render() {
        const _a = this.props, { type, rowIndex } = _a, rest = __rest(_a, ["type", "rowIndex"]);
        const { checked } = this.state;
        if (type === 'radio') {
            return (React.createElement(Radio, Object.assign({ checked: checked, value: rowIndex }, rest)));
        }
        else {
            return (React.createElement(Checkbox, Object.assign({ checked: checked }, rest)));
        }
    }
}
