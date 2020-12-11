import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

interface PortalProps {
  getContainer: () => HTMLElement
  children: React.ReactNode | React.ReactChildren
  didUpdate: (props: PortalProps) => void
}

export default class Portal extends React.Component<PortalProps> {
  _container: HTMLElement

  static propTypes = {
    getContainer: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    didUpdate: PropTypes.func,
  }

  componentDidMount() {
    this.createContainer();
  }

  componentDidUpdate(prevProps: PortalProps) {
    const { didUpdate } = this.props;
    if (didUpdate) {
      didUpdate(prevProps);
    }
  }

  componentWillUnmount() {
    this.removeContainer();
  }

  createContainer() {
    this._container = this.props.getContainer();
    this.forceUpdate();
  }

  removeContainer() {
    if (this._container) {
      this._container.parentNode.removeChild(this._container);
    }
  }

  render() {
    if (this._container) {
      return ReactDOM.createPortal(this.props.children, this._container);
    }
    return null;
  }
}
