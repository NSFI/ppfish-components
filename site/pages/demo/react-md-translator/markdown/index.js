import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import prism from 'prismjs';
import Canvas from './canvas';
import PropTypes from "prop-types";
import NProgress from 'nprogress';

export default class Markdown extends React.Component {

  static propTypes = {
    dependencies: PropTypes.object,
    renderer: PropTypes.object,
    progress: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.components = new Map;
    this.renderer = new marked.Renderer();
    this.renderer.table = (header, body) => {
      return `<table class="md-table"><thead>${header}</thead><tbody>${body}</tbody></table>`;
    };
    this.renderer.listitem = function (text) {
      return `<li class="md-listitem">${text}</li>`;
    };
    this.renderer.paragraph = function (text) {
      return `<p class="md-paragraph">${text}</p>`;
    };
    this.renderer.heading = function (text, level, raw) {
      if (this.options.headerIds) {
        return '<h' + level + ' id="' + text + '" class="md-heading">' + text + '</h' + level + '>\n';
      }
      // ignore IDs
      return '<h' + level + ' class="md-heading" >' + text + '</h' + level + '>\n';
    };
    // 开发自定义 marked.renderer;
    if (this.props.renderer) this.renderer = this.props.renderer;
  }

  componentDidMount() {
    this.renderDOM();
  }

  componentDidUpdate() {
    this.renderDOM();
  }

  renderDOM() {
    if (this.props.progress) {
      NProgress.start();
      setTimeout(() => {
        NProgress.done();
      });
    }
    for (const [id, component] of this.components) {
      const div = document.getElementById(id);

      if (div instanceof HTMLElement) {
        ReactDOM.render(component, div);
      }
    }
    prism.highlightAll();
  }

  //:::demo ::: 更换成带随机数id的坑位 ，再次render 放入坑位内
  render() {
    const document = this.props.children;

    if (typeof document === 'string') {
      this.components.clear();

      const html = marked(document.replace(/:::\s?(demo|display)\s?([^]+?):::/g, (match, p1, p2, offset) => {
        const id = offset.toString(36);
        this.components.set(id, React.createElement(Canvas, Object.assign({
          name: this.constructor.name.toLowerCase(),
          showCode: p1 === 'demo',
          containerId: id
        }, this.props), p2));

        return `<div id=${id} class="demo-container"></div>`;
      }), {renderer: this.renderer});

      return (
          <div dangerouslySetInnerHTML={{
            __html: html
          }}/>
      );
    } else {
      return <span/>;
    }
  }
}
