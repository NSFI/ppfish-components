import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Dialog from './Dialog';
import { ContainerRender, Portal } from '../../utils';
import './style/index.less';
const IS_REACT_16 = 'createPortal' in ReactDOM;
class DialogWrap extends React.Component {
    constructor() {
        super(...arguments);
        this.saveDialog = (node) => {
            this._component = node;
        };
        this.getComponent = (extra = {}) => {
            return (React.createElement(Dialog, Object.assign({ ref: this.saveDialog }, this.props, extra, { key: "dialog" })));
        };
        // fix issue #10656
        /*
        * Custom container should not be return, because in the Portal component, it will remove the
        * return container element here, if the custom container is the only child of it's component,
        * like issue #10656, It will has a conflict with removeChild method in react-dom.
        * So here should add a child (div element) to custom container.
        * */
        this.getContainer = () => {
            const container = document.createElement('div');
            if (this.props.getContainer) {
                this.props.getContainer().appendChild(container);
            }
            else {
                document.body.appendChild(container);
            }
            return container;
        };
    }
    shouldComponentUpdate({ visible }) {
        return !!(this.props.visible || visible);
    }
    componentWillUnmount() {
        if (IS_REACT_16) {
            return;
        }
        if (this.props.visible) {
            this.renderComponent({
                afterClose: this.removeContainer,
                onClose() {
                },
                visible: false,
            });
        }
        else {
            this.removeContainer();
        }
    }
    render() {
        const { visible } = this.props;
        let portal = null;
        if (!IS_REACT_16) {
            return (React.createElement(ContainerRender, { parent: this, visible: visible, autoDestroy: false, getComponent: this.getComponent, getContainer: this.getContainer }, ({ renderComponent, removeContainer }) => {
                this.renderComponent = renderComponent;
                this.removeContainer = removeContainer;
                return null;
            }));
        }
        if (visible || this._component) {
            portal = (React.createElement(Portal, { getContainer: this.getContainer }, this.getComponent()));
        }
        return portal;
    }
}
DialogWrap.defaultProps = {
    visible: false,
};
export default DialogWrap;
