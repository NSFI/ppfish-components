// import { Spin } from 'antd';
import hoistNonReactStatic from 'hoist-non-react-statics';
import React, { Component } from 'react';
import Consumer from './Consumer';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}


const withLocale = ({ componentName }) =>
  <WrappedProps extends {}>(WrappedComponent: React.ComponentType<WrappedProps>): any => {

    type WithLocaleProps = WrappedProps;
    type WithLocaleState = {
      Locale?: object
    };

    class WithLocale extends Component<WithLocaleProps, WithLocaleState> {
      static displayName: string;
      constructor (props) {
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
                  {...this.props as WrappedProps}
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
