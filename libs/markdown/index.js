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

    //针对 table、li、title一些特殊处理
    this.renderer = new marked.Renderer();
    this.renderer.table = (header, body) => {
      return `<table class="grid"><thead>${header}</thead><tbody>${body}</tbody></table>`;
    };
    this.renderer.listitem = function (text) {
      return '<li class="md-listitem">' + text + '</li>\n';
    };
    this.renderer.paragraph = function (text) {
      return '<p class="md-paragraph">' + text + '</p>\n';
    };
    this.renderer.heading = function (text, level, raw) {
      if (this.options.headerIds) {
        let id = text;
        // h1
        if (level === 1) {
          const textId = text.replace(/【(.+)】/, '');
          id = textId === text ? text : textId;
          text = text.replace(/【(.+)】/, function (ownerList) {
            return `<div class="md-owner"><div class="owner-title"><i class="fishdicon fishdicon-user-line"></i></div><ul class="owner-list">${ownerList.slice(1, -1).split('|').map(owner => `<li class="item">${owner}</li>`).join('')}</ul></div>`;
          });
        }
        return '<h' + level + ' id="' + id + '" class="md-heading">' + text + '</h' + level + '>\n';
      }
      // ignore IDs
      return '<h' + level + ' class="md-heading" >' + text + '</h' + level + '>\n';
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
  }

  //:::demo ::: 更换成带随机数id的坑位 ，再次render 放入坑位内
  render() {
    const document = this.document();

    if (typeof document === 'string') {
      this.components.clear();

      const html = marked(document.replace(/:::\s?demo\s?([^]+?):::/g, (match, p1, offset) => {
        const id = offset.toString(36);

        this.components.set(id, React.createElement(Canvas, Object.assign({
          name: this.constructor.name.toLowerCase()
        }, this.props), p1));

        return `<div id=${id} class="demo-container"></div>`;
      }), {renderer: this.renderer});

      return (
        <div>
          <div dangerouslySetInnerHTML={{
            __html: html
          }}/>
          <div className="slider-container">
            <Slider/>
          </div>
        </div>
      );
    } else {
      return <span/>;
    }
  }
}
