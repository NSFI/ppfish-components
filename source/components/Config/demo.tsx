import React from 'react';
import withLocale from '../Config/Locale/withLocale';
import ConfigConsumer from '../Config/Consumer';
import { LocaleProperties } from '../Locale';

// withLocale demo
@withLocale({ componentName: 'Table' })
class WithLocaleDemo extends React.Component<{ Locale?: LocaleProperties["Table"] }> {
  constructor (props) {
    super(props);
  }
  render() {
    const { Locale } = this.props;
    return (
      <div>
        withLocale demo:  Locale {Locale.filterTitle}
      </div>
    )
  }
}

// Consumer demo
class ConsumerDemo extends React.Component<{}> {
  constructor (props) {
    super(props);
  }
  render() {
    return (
      <ConfigConsumer componentName="Table">
        {
          (Locale: LocaleProperties["Table"]) =>
            <div>
              ConfigConsumer demo:  Locale {Locale.filterTitle}
            </div>
        }
      </ConfigConsumer>
    )
  }
}

export {
  WithLocaleDemo,
  ConsumerDemo
};
