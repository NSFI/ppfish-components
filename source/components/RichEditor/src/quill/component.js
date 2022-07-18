/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
'use strict';
import QuillMixin from './mixin';
/* eslint-disable react/prefer-es6-class */
let React = require('react');
let ReactDOM = require('react-dom');
let createClass = require('create-react-class');
let some = require('lodash/some');
let isEqual = require('lodash/isEqual');
let T = require('prop-types');
let DOM = require('react-dom-factories');
let polyfill = require('react-lifecycles-compat').polyfill;

/*
Changing one of these props should cause a full re-render.
*/
const quillDirtyProps = ['modules', 'formats', 'bounds', 'theme', 'children'];

let QuillComponent = createClass({
  displayName: 'Quill',

  propTypes: {
    modules: function(props) {
      let isNotObject = T.object.apply(this, arguments);
      if (isNotObject) return isNotObject;

      if (
        props.modules &&
        props.modules.toolbar &&
        props.modules.toolbar[0] &&
        props.modules.toolbar[0].type
      )
        return new Error(
          'Since v1.0.0, React Quill will not create a custom toolbar for you ' +
            'anymore. Create a toolbar explictly, or let Quill create one. ' +
            'See: https://github.com/zenoamaro/react-quill#upgrading-to-react-quill-v100',
        );
    },

    toolbar: function(props) {
      if ('toolbar' in props)
        return new Error(
          'The `toolbar` prop has been deprecated. Use `modules.toolbar` instead. ' +
            'See: https://github.com/zenoamaro/react-quill#upgrading-to-react-quill-v100',
        );
    },

    formats: function(props) {
      let isNotArrayOfString = T.arrayOf(T.string).apply(this, arguments);

      if (isNotArrayOfString)
        return new Error(
          'You cannot specify custom `formats` anymore. Use Parchment instead.  ' +
            'See: https://github.com/zenoamaro/react-quill#upgrading-to-react-quill-v100.',
        );
    },

    styles: function(props) {
      if ('styles' in props)
        return new Error(
          'The `styles` prop has been deprecated. Use custom stylesheets instead. ' +
            'See: https://github.com/zenoamaro/react-quill#upgrading-to-react-quill-v100.',
        );
    },

    pollInterval: function(props) {
      if ('pollInterval' in props)
        return new Error(
          'The `pollInterval` property does not have any effect anymore. ' +
            'You can safely remove it from your props. ' +
            'See: https://github.com/zenoamaro/react-quill#upgrading-to-react-quill-v100.',
        );
    },

    children: function(props) {
      // Validate that the editor has only one child element and it is not a <textarea>
      let isNotASingleElement = T.element.apply(this, arguments);
      if (isNotASingleElement)
        return new Error('The Quill editing area can only be composed of a single React element.');

      if (React.Children.count(props.children)) {
        let child = React.Children.only(props.children);
        if (child.type === 'textarea')
          return new Error('Quill does not support editing on a <textarea>. Use a <div> instead.');
      }
    },
  },

  mixins: [QuillMixin],

  getDefaultProps: function() {
    return {
      theme: 'snow',
      modules: {},
    };
  },

  getInitialState: function() {
    return {
      editor: null,
      lastDeltaChangeSet: null,
      isEqualContents: false,
      readOnly: this.props.readOnly,
      generation: 0,
      value: this.isControlled() ? this.props.value : this.props.defaultValue,
    };
  },

  componentDidMount: function() {
    let editor = this.createEditor(this.getEditingArea(), this.getEditorConfig());

    /* eslint-disable react/no-did-mount-set-state */
    this.setState(
      {
        editor,
      },
      () => {
        // Restore editor from Quill's native formats in regeneration scenario
        if (this.quillDelta) {
          this.state.editor.setContents(this.quillDelta);
          this.state.editor.setSelection(this.quillSelection);
          // this.state.editor.focus();
          this.quillDelta = this.quillSelection = null;
        } else if (this.state.value) {
          this.setEditorContents(this.state.editor, this.state.value);
        }
      },
    );
    /* eslint-enable react/no-did-mount-set-state */
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    let self = this;

    // If the component has been regenerated, we already know we should update.
    if (this.state.generation !== nextState.generation) {
      return true;
    }

    // Compare props that require React updating the DOM.
    return some(this.cleanProps, function(prop) {
      // Note that `isEqual` compares deeply, making it safe to perform
      // non-immutable updates, at the cost of performance.
      return !isEqual(nextProps[prop], self.props[prop]);
    });
  },

  componentDidUpdate: function(prevProps, prevState) {
    let { editor, isEqualContents } = this.state,
      { readOnly, value } = this.props;

    if (!isEqualContents) {
      this.setEditorContents(editor, value);
    }

    // We can update readOnly state in-place.
    if ('readOnly' in this.props) {
      if (readOnly !== prevState.readOnly) {
        readOnly ? editor.disable() : editor.enable();
      }
    }

    if (this.state.generation !== prevState.generation) {
      this.regenerate();
    }
  },

  componentWillUnmount: function() {
    let editor;
    if ((editor = this.getEditor())) {
      this.unhookEditor(editor);
      this.setState({
        editor: null,
      });
    }
  },

  /*
	Changing one of these props should cause a regular update.
	*/
  cleanProps: [
    'value',
    'id',
    'className',
    'style',
    'placeholder',
    'tabIndex',
    'onChange',
    'onSelectionChange',
    'onFocus',
    'onBlur',
    'onKeyPress',
    'onKeyDown',
    'onKeyUp',
  ],

  /*
	We consider the component to be controlled if `value` is being sent in props.
	*/
  isControlled: function() {
    return 'value' in this.props;
  },

  getEditorConfig: function() {
    return {
      bounds: this.props.bounds,
      formats: this.props.formats,
      modules: this.props.modules,
      placeholder: this.props.placeholder,
      readOnly: this.props.readOnly,
      scrollingContainer: this.props.scrollingContainer,
      tabIndex: this.props.tabIndex,
      theme: this.props.theme,
    };
  },

  getEditor: function() {
    return this.state.editor;
  },

  getEditingArea: function() {
    return ReactDOM.findDOMNode(this.editingArea);
  },

  getEditorContents: function() {
    return this.state.value;
  },

  getEditorSelection: function() {
    return this.state.selection;
  },

  /*
	True if the value is a Delta instance or a Delta look-alike.
	*/
  isDelta: function(value) {
    return value && value.ops;
  },

  /*
	Special comparison function that knows how to compare Deltas.
	*/
  isEqualValue: function(value, nextValue) {
    if (this.isDelta(value) && this.isDelta(nextValue)) {
      return isEqual(value.ops, nextValue.ops);
    } else {
      return isEqual(value, nextValue);
    }
  },

  /*
	Regenerating the editor will cause the whole tree, including the container,
	to be cleaned up and re-rendered from scratch.
	*/
  regenerate: function() {
    // Cache selection and contents in Quill's native format to be restored later
    this.quillDelta = this.state.editor.getContents();
    this.quillSelection = this.state.editor.getSelection();
    this.componentWillUnmount();
    this.componentDidMount();
  },

  /*
	Renders an editor area, unless it has been provided one to clone.
	*/
  renderEditingArea: function() {
    let self = this;
    let children = this.props.children;

    let properties = {
      key: this.state.generation,
      tabIndex: this.props.tabIndex,
      ref: function(element) {
        self.editingArea = element;
      },
    };

    let customElement = React.Children.count(children) ? React.Children.only(children) : null;

    let editingArea = customElement
      ? React.cloneElement(customElement, properties)
      : DOM.div(properties);

    return editingArea;
  },

  onEditorChangeText: function(value, delta, source, editor) {
    let currentContents = this.getEditorContents();

    // We keep storing the same type of value as what the user gives us,
    // so that value comparisons will be more stable and predictable.
    let nextContents = this.isDelta(currentContents) ? editor.getContents() : editor.getRawHTML();

    if (!this.isEqualValue(nextContents, currentContents)) {
      // Taint this `delta` object, so we can recognize whether the user
      // is trying to send it back as `value`, preventing a likely loop.
      this.setState({
        value: nextContents,
        lastDeltaChangeSet: delta,
      });

      // 初次生成ReactQuill时toolbar未完成，需要再次生成ReactQuill，避免onChange多次调用
      if (this.props.onChange && this.state.generation != 0) {
        this.props.onChange(value, delta, source, editor);
      }
    }
  },

  onEditorChangeSelection: function(nextSelection, source, editor) {
    let currentSelection = this.getEditorSelection();
    let hasGainedFocus = !currentSelection && nextSelection;
    // let hasLostFocus = currentSelection && !nextSelection;

    if (isEqual(nextSelection, currentSelection)) {
      return;
    }

    this.setState({ selection: nextSelection });

    if (this.props.onSelectionChange) {
      this.props.onSelectionChange(nextSelection, source, editor);
    }

    if (hasGainedFocus && this.props.onFocus) {
      this.props.onFocus(nextSelection, source, editor);
    }
    // 此种方式无法监听到焦点转义到 Select 时失焦的情况，改为直接监听 ql-editor 的 blur 事件
    // else if (hasLostFocus && this.props.onBlur) {
    // 	this.props.onBlur(currentSelection, source, editor);
    // }
  },

  focus: function() {
    this.state.editor.focus();
  },

  blur: function() {
    this.setEditorSelection(this.state.editor, null);
  },

  render: function() {
    return DOM.div(
      {
        id: this.props.id,
        style: this.props.style,
        key: this.state.generation,
        className: ['quill'].concat(this.props.className).join(' '),
        onKeyPress: this.props.onKeyPress,
        onKeyDown: this.props.onKeyDown,
        onKeyUp: this.props.onKeyUp,
      },
      this.renderEditingArea(),
    );
  },
});

QuillComponent.getDerivedStateFromProps = function(nextProps, prevState) {
  const { prevProps = {}, editor } = prevState;
  const newState = {
    prevProps: nextProps,
  };

  // If the component is unmounted and mounted too quickly
  // an error is thrown in setEditorContents since editor is
  // still undefined. Must check if editor is undefined
  // before performing this call.
  if (!editor) return null;

  // Update only if we've been passed a new `value`.
  // This leaves components using `defaultValue` alone.
  if ('value' in nextProps) {
    let currentContents = prevState.value;
    let nextContents = nextProps.value;

    if (nextContents === prevState.lastDeltaChangeSet)
      throw new Error(
        'You are passing the `delta` object from the `onChange` event back ' +
          'as `value`. You most probably want `editor.getContents()` instead. ' +
          'See: https://github.com/zenoamaro/react-quill#using-deltas',
      );

    // NOTE: Seeing that Quill is missing a way to prevent
    //       edits, we have to settle for a hybrid between
    //       controlled and uncontrolled mode. We can't prevent
    //       the change, but we'll still override content
    //       whenever `value` differs from current state.
    // NOTE: Comparing an HTML string and a Quill Delta will always trigger
    //       a change, regardless of whether they represent the same document.
    let isEqualContents = isEqual(nextContents, currentContents);
    if (nextContents && currentContents && nextContents.ops && currentContents.ops) {
      isEqualContents = isEqual(nextContents.ops, currentContents.ops);
    }

    newState['isEqualContents'] = isEqualContents;
  }

  // Whenever a `dirtyProp` changes, the editor needs reinstantiation.
  let shouldRegenerate = some(quillDirtyProps, function(prop) {
    return !isEqual(nextProps[prop], prevProps[prop]);
  });

  if (shouldRegenerate) {
    newState['generation'] = prevState.generation + 1;
  }

  return newState;
};

polyfill(QuillComponent);
export default QuillComponent;
