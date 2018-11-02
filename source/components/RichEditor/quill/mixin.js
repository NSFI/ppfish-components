'use strict';

let Quill = require('quill');

let QuillMixin = {

	/**
	Creates an editor on the given element. The editor will
	be passed the configuration, have its events bound,
	*/
	createEditor: function($el, config) {
		let editor = new Quill($el, config);
		editor.getHTML = function(){ return editor.root.innerHTML; };

		if (config.tabIndex !== undefined) {
			this.setEditorTabIndex(editor, config.tabIndex);
		}

		this.hookEditor(editor);

		return editor;
	},

	hookEditor: function(editor) {
		// Expose the editor on change events via a weaker,
		// unprivileged proxy object that does not allow
		// accidentally modifying editor state.
		let unprivilegedEditor = this.makeUnprivilegedEditor(editor);

		this.handleTextChange = function(delta, oldDelta, source) {
			if (this.onEditorChangeText) {
				this.onEditorChangeText(
					editor.root.innerHTML, delta, source,
					unprivilegedEditor
				);
				this.onEditorChangeSelection(
					editor.getSelection(), source,
					unprivilegedEditor
				);
			}
		}.bind(this);

		this.handleSelectionChange = function(range, oldRange, source) {
			if (this.onEditorChangeSelection) {
				this.onEditorChangeSelection(
					range, source,
					unprivilegedEditor
				);
			}
		}.bind(this);

		editor.on('text-change', this.handleTextChange);
		editor.on('selection-change', this.handleSelectionChange);
	},

	unhookEditor: function(editor) {
		editor.off('selection-change');
		editor.off('text-change');
	},

	setEditorReadOnly: function(editor, value) {
		value? editor.disable() : editor.enable();
	},

	/*
	Replace the contents of the editor, but keep
	the previous selection hanging around so that
	the cursor won't move.
	*/
	setEditorContents: function(editor, value) {
		let sel = editor.getSelection();

		if (typeof value === 'string') {
			editor.setContents(editor.clipboard.convert(value));
		} else {
			editor.setContents(value);
		}

		if (sel && editor.hasFocus()) this.setEditorSelection(editor, sel);
	},

	setEditorSelection: function(editor, range) {
		if (range) {
			// Validate bounds before applying.
			let length = editor.getLength();
			range.index = Math.max(0, Math.min(range.index, length-1));
			range.length = Math.max(0, Math.min(range.length, (length-1) - range.index));
		}
		editor.setSelection(range);
	},

	setEditorTabIndex: function(editor, tabIndex) {
		if (editor.editor && editor.editor.scroll && editor.editor.scroll.domNode) {
			editor.editor.scroll.domNode.tabIndex = tabIndex;
		}
	},

	/*
	Returns an weaker, unprivileged proxy object that only
	exposes read-only accessors found on the editor instance,
	without any state-modificating methods.
	*/
	makeUnprivilegedEditor: function(editor) {
		let e = editor;
		return {
			getLength:    	function(){ return e.getLength.apply(e, arguments); },
			getText:      	function(){ return e.getText.apply(e, arguments); },
			getHTML:      	function(){ return e.root.innerHTML; },
			getContents:  	function(){ return e.getContents.apply(e, arguments); },
			getSelection: 	function(){ return e.getSelection.apply(e, arguments); },
			getBounds:   		function(){ return e.getBounds.apply(e, arguments); },
			isRichContents: function(){
				const delta = e.getContents.apply(e, arguments),
							defaultSize = '14px',
							defaultColor = '#000000';
				let	isRich = false;

				if (delta && delta.ops && delta.ops.length) {
					let deltaOps = delta.ops;

					for (let i=0, len=deltaOps.length; i<len; i++) {
						let item = deltaOps[i];

						if ('insert' in item && typeof(item['insert'])!='string') {
							isRich = true;
							break;
						}

						if ('attributes' in item) {
							let attrObj = item['attributes'],
									attrNames = Object.keys(attrObj);

							for (let j=0,attrLen=attrNames.length; j<attrLen; j++) {
								let attr = attrNames[j];
								if (attr != 'customSize' && attr != 'color') {
									isRich = true;
									break;
								} else {
									if (attr == 'customSize' && attrObj['customSize'] &&
											attrObj['customSize'] != defaultSize) {
										isRich = true;
										break;
									}

									if (attr == 'color' && attrObj['color'] &&
											attrObj['color'] != defaultColor) {
										isRich = true;
										break;
									}
								}
							}
						}
					}
				}

				return isRich;
			}
		};
	}

};

module.exports = QuillMixin;
