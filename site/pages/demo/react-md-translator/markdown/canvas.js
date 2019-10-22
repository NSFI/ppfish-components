import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import marked from 'marked';
import {transform} from 'babel-standalone';
import Editor from '../editor';
import less from 'less';
import prism from 'prismjs';
import 'prismjs/components/prism-less';

//代码展示容器
export default class Canvas extends React.Component {
  static propTypes = {
    locale: PropTypes.object,
    name: PropTypes.string,
    containerId: PropTypes.string,
    children: PropTypes.node,
    dependencies: PropTypes.object,
    showCode: PropTypes.bool,
  };

  static defaultProps = {
    showCode: true,
    locale: {
      hide: '隐藏代码',
      show: '编辑代码'
    }
  };

  constructor(props) {
    super(props);
    //坑位Id
    this.playerId = `player-${parseInt(Math.random() * 1e9).toString(36)}`;
    //分类匹配出less/js/jsx/css
    const descriptionSource = this.props.children.replace(/(`{3})([^`]|[^`][\s\S]*?[^`])\1(?!`)/ig, (markdown) => {
      const [all, type, code] = markdown.match(/```(.*)\n?([^]+)```/);
      switch (type.trim()) {
        case 'js':
        case 'jsx':
          this.jsCode = code;
          break;
        case 'less':
          this.lessCodeSource = marked(all);
          less.render(`
            #${this.playerId} {
              ${code}
            }
          `, (e, compiledCode) => {
            this.lessCode = compiledCode.css;
          });
          break;
        case 'css':
          this.cssCodeSource = marked(all);
          less.render(`
            #${this.playerId} {
              ${code}
            }
          `, (e, compiledCode) => {
            this.cssCode = compiledCode.css;
          });
          break;
        default:
          break;
      }
      return '';
    });

    //replace剩下的是description
    this.description = marked(descriptionSource);

    this.state = {
      showBlock: false,
    };
  }

  componentDidMount() {
    this.renderSource(this.jsCode);
  }

  blockControl() {
    this.setState({
      showBlock: !this.state.showBlock,
    }, () => {
      if (this.state.showBlock && (this.lessCodeSource || this.cssCodeSource)) {
        prism.highlightAllUnder(document.getElementById(`${this.props.containerId}`));
      }
    });
  }

  renderSource(value) {
    new Promise((resolve) => {
      const args = ['context', 'React', 'ReactDOM'];
      const argv = [this, React, ReactDOM];
      this.props.dependencies &&
      Object.keys(this.props.dependencies).forEach((key) => {
        args.push(key);
        argv.push(this.props.dependencies[key]);
      });
      resolve({args, argv})
    }).then(({args, argv}) => {
      let code;
      if (/ReactDOM\.render/.test(value)) {
        code = transform(`
           ${value.replace('mountNode', `document.getElementById('${this.playerId}')`)}
        `, {
          presets: ['react', 'stage-1']
        }).code;
      } else {
        code = transform(`
          class Demo extends React.Component {
             ${value}
          }
          ReactDOM.render(<Demo {...context.props} />,
          document.getElementById('${this.playerId}'))
          `, {
          presets: ['react', 'stage-1']
        }).code;
      }
      args.push(code);
      //render to playrId div
      new Function(...args).apply(null, argv);
    }).catch((err) => {
      if (process.env.NODE_ENV !== 'production') {
        throw err;
      }
    });
  }

  render() {
    if (!this.props.showCode) {
      return (
          <div className={`demo-block demo-box demo-${this.props.name}`}>
            <div className="source" id={this.playerId}/>
          </div>
      )
    }

    return (
        <div className={`demo-block demo-box demo-${this.props.name}`}>
          <div className="source" id={this.playerId}/>
          {
            this.state.showBlock && (
                <div className="meta">
                  {
                    this.description && (
                        <div
                            ref="description"
                            className="description"
                            dangerouslySetInnerHTML={{__html: this.description}}
                        />
                    )
                  }
                  <Editor
                      value={this.jsCode}
                      onChange={code => this.renderSource(code)}
                  />
                  {this.lessCodeSource && (
                      <div className="style-block" dangerouslySetInnerHTML={{__html: this.lessCodeSource}}/>)}
                  {this.cssCodeSource && (
                      <div className="style-block" dangerouslySetInnerHTML={{__html: this.cssCodeSource}}/>)}
                </div>
            )
          }
          <div className="demo-block-control" onClick={this.blockControl.bind(this)}>
            {
              this.state.showBlock ? (
                  <span>{this.props.locale.hide}</span>
              ) : (
                  <span>{this.props.locale.show}</span>
              )
            }
          </div>
          {this.lessCode && (<style>{this.lessCode}</style>)}
          {this.cssCode && (<style>{this.cssCode}</style>)}
        </div>
    );
  }
}
