import * as React from 'react';

export interface DomWrapperProps {
  children: React.ReactNode;
}

class DomWrapper extends React.Component<DomWrapperProps> {
  render() {
    return this.props.children;
  }
}

export default DomWrapper;