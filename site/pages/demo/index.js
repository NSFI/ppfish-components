import 'babel-polyfill';
import React from 'react';
import PropTypes from 'prop-types';
import ReactMDTranslator from './react-md-translator';

import {plainComponents} from '../../componentsPage';
import renderer from './renderer';
import * as source from './source.js';
import Slider from './slider/index.js';

export default class Loadable extends React.Component {

  static  propTypes = {
    params: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  render() {
    const menuItem = plainComponents.find(itm => itm.key === this.props.params.demo);
    if (menuItem || !this.props.params.demo) {
      if (menuItem && menuItem.type === 'react') {
        const Demo = menuItem.component.default;
        return (
          <div>
            <Demo {...this.props}/>
            <div className="slider-container">
              <Slider title={this.props.params.demo}/>
            </div>
          </div>
        );
      } else {
        const mdProps = menuItem && menuItem.props ? menuItem.props : {};
        let markdown;
        try {
          markdown = require(`../../docs/zh-CN/${this.props.params.demo}.md`);
        } catch (e) {
          markdown = require(`../../docs/zh-CN/quickStart.md`);
        }
        return (
          <div>
            <ReactMDTranslator
              dependencies={source}
              renderer={renderer}
              progress
              {...mdProps}>
              {markdown}
            </ReactMDTranslator>
            <div className="slider-container">
              <Slider title={this.props.params.demo}/>
            </div>
          </div>
        );
      }
    } else {
      location.assign('/#/home');
      return null;
    }
  }
}
