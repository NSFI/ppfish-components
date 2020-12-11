import * as React from "react";
import * as ReactDOM from "react-dom";
import PropTypes from "prop-types";

interface ContainerRenderProps {
  autoMount: boolean;
  autoDestroy: boolean;
  visible: boolean;
  forceRender: boolean;
  parent: React.Component & { _component: any };
  getComponent: (props: any) => React.DOMElement<ContainerRenderProps, any>;
  getContainer: () => HTMLElement;
  children: ({ renderComponent, removeContainer }) => React.ReactNode;
}

export default class ContainerRender extends React.Component<
  ContainerRenderProps
> {
  container: HTMLElement;

  static propTypes = {
    autoMount: PropTypes.bool,
    autoDestroy: PropTypes.bool,
    visible: PropTypes.bool,
    forceRender: PropTypes.bool,
    parent: PropTypes.node,
    getComponent: PropTypes.func.isRequired,
    getContainer: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired
  };

  static defaultProps = {
    autoMount: true,
    autoDestroy: true,
    forceRender: false
  };

  componentDidMount() {
    if (this.props.autoMount) {
      this.renderComponent();
    }
  }

  componentDidUpdate() {
    if (this.props.autoMount) {
      this.renderComponent();
    }
  }

  componentWillUnmount() {
    if (this.props.autoDestroy) {
      this.removeContainer();
    }
  }

  removeContainer = () => {
    if (this.container) {
      ReactDOM.unmountComponentAtNode(this.container);
      this.container.parentNode.removeChild(this.container);
      this.container = null;
    }
  };

  renderComponent = (props?, ready?: boolean) => {
    const {
      visible,
      getComponent,
      forceRender,
      getContainer,
      parent
    } = this.props;
    if (visible || parent._component || forceRender) {
      if (!this.container) {
        this.container = getContainer();
      }
      ReactDOM.unstable_renderSubtreeIntoContainer(
        parent,
        getComponent(props),
        this.container,
        function callback() {
          if (ready) {
            // @ts-ignore
            ready.call(this);
          }
        }
      );
    }
  };

  render() {
    return this.props.children({
      renderComponent: this.renderComponent,
      removeContainer: this.removeContainer
    });
  }
}
