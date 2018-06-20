import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import prism from 'prismjs';
import Canvas from './canvas';
import Slider from '../slider';

export default class Markdown extends React.Component {
  constructor(props) {
    super(props);

    this.components = new Map;

    this.renderer = new marked.Renderer();
    this.renderer.table = (header, body) => {
      return `<table class="grid"><thead>${header}</thead><tbody>${body}</tbody></table>`;
    };
    this.renderer.heading = function (text, level, raw) {
      if (this.options.headerIds) {
        return '<h'
          + level
          + ' id="'
          + text
          + '">'
          + text
          + '</h'
          + level
          + '>\n';
      }
      // ignore IDs
      return '<h' + level + '>' + text + '</h' + level + '>\n';
    };
  }

  componentDidMount() {
    this.renderDOM();
  }

  componentDidUpdate() {
    this.renderDOM();
  }

  renderDOM() {
    for (const [id, component] of this.components) {
      const div = document.getElementById(id);

      if (div instanceof HTMLElement) {
        ReactDOM.render(component, div);
      }
    }
    prism.highlightAll();
    this.getSidebarAnchor();
  }

  getSidebarAnchor = () => {
    const anchors = Array.from(document.querySelectorAll('h3')).map(h3Item => ({
      id: h3Item.id,
      name: h3Item.innerText
    }));
    ReactDOM.render(<Slider anchors={anchors}/>, document.getElementById('slider-container'));
  };

  //:::demo ::: 更换成带随机数id的坑位 ，再次render 放入坑位内
  render() {
    const document = this.document(localStorage.getItem('ELEMENT_LANGUAGE') || 'zh-CN');

    if (typeof document === 'string') {
      this.components.clear();

      const html = marked(document.replace(/:::\s?demo\s?([^]+?):::/g, (match, p1, offset) => {
        const id = offset.toString(36);

        this.components.set(id, React.createElement(Canvas, Object.assign({
          name: this.constructor.name.toLowerCase()
        }, this.props), p1));

        return `<div id=${id}></div>`;
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
