// import { Spin } from 'antd';
import hoistNonReactStatic from 'hoist-non-react-statics';
import React, { Component } from 'react';
import Consumer from './Consumer';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

const withLocale = ({ componentName }) => (WrappedComponent) => {
  class WithLocale extends Component<any> {
    static displayName: string;
    state: {
      Locale?: object
    }
    constructor(props) {
      super(props);

      this.state = {
        Locale: null,
      };
    }

    render() {
      return (
        <Consumer componentName={componentName}>
          {
            (Locale) =>
              <WrappedComponent
                {...this.props}
                Locale={Locale}
              />
          }
        </Consumer>
      );
    }
  }
  WithLocale.displayName = `WithLocale(${getDisplayName(WrappedComponent)})`;
  return hoistNonReactStatic(WithLocale, WrappedComponent);
};

export default withLocale;
