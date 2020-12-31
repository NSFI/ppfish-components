// import { Spin } from 'antd';
import hoistNonReactStatic from 'hoist-non-react-statics';
import React, { Component } from 'react';
import Consumer from './Consumer';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}


const withLocale = ({ componentName }) =>
  <WrappedProps extends {}>(WrappedComponent: React.ComponentType<WrappedProps>): any => {

    type WithLocaleProps = WrappedProps & {
      forwardRef: any,
    };
    type WithLocaleState = {
      Locale?: object
    };

    class WithLocale extends Component<WithLocaleProps, WithLocaleState> {
      static displayName: string;
      constructor(props) {
        super(props);

        this.state = {
          Locale: null,
        };
      }

      render() {
        const { forwardRef, ...otherProps } = this.props;
        return (
          <Consumer componentName={componentName}>
            {
              (Locale) =>
                <WrappedComponent
                  ref={forwardRef}
                  {...otherProps as WrappedProps}
                  Locale={Locale}
                />
            }
          </Consumer>
        );
      }
    }

    WithLocale.displayName = `WithLocale(${getDisplayName(WrappedComponent)})`;
    return React.forwardRef(function WithLocaleRef(props, ref) {
      const WithLocaleRef = hoistNonReactStatic(WithLocale, WrappedComponent)
      return <WithLocaleRef {...props as WrappedProps} forwardedRef={ref} />;
    });
  };

export default withLocale;
